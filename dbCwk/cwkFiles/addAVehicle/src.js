import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://lsgihxghcclaurdxaspt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2loeGdoY2NsYXVyZHhhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTIzNTcsImV4cCI6MjA2MDM4ODM1N30.bdrNA24cKN0CaBiTvL2uOidstWL7-Dnkb3N1YW_J50I';
const supabase = createClient(supabaseUrl, supabaseKey);
const addVehicleBut = document.getElementById('addVehicleBut');
const checkOwnerBut = document.getElementById('checkOwner');
const ownerInput = document.getElementById('owner');

let ownerID = null;

ownerInput.addEventListener('input',()=>{
    if (ownerInput.value.trim()===''){
        checkOwnerBut.disabled = true;
    }
    else{
        checkOwnerBut.disabled = false;
    }
}); 

function displayVehicleMessage(msg){
    document.getElementById('message-vehicle').innerHTML=msg;
    document.getElementById('message').innerHTML=msg;
}

function displayOwnerMessage(msg){
    document.getElementById('message-owner').innerHTML=msg;
}

async function getOwnerMatches(){
    let inputForOwner = document.getElementById('owner').value;
    try{
        const { data, error } = await supabase
            .from('People')
            .select('*')
            .ilike('Name', `%${inputForOwner}%`)

        if (error){
            console.error("Supabase error:", error);
            displayVehicleMessage(`Error: ${error.message}`);
            return [];
        }

        return data;

    } catch (error){
        console.error("Fetch error:", error);
        displayVehicleMessage(`Error: ${error.message}`);
        return [];
    }
}

function selectOwner(selectedOwnerID){
    ownerID = selectedOwnerID;

    console.log(`need to save vehicle to owner with id: ${ownerID}`);
}

function displayOwners(results){
    console.log(results);
    let ownerResultsContainer = document.getElementById('owner-results');

    results.forEach(owner => {
        let innerOwnerDiv = document.createElement('div');
        for (const key in owner){
            let atttributeP = document.createElement('p');
            atttributeP.textContent=`${key} : ${owner[key]}`;
            innerOwnerDiv.appendChild(atttributeP);
        }

        const selectOwnerButton = document.createElement('button');
        selectOwnerButton.textContent='Select owner';

        selectOwnerButton.addEventListener('click',function(){
            selectOwner(owner['PersonID']);
        });

        innerOwnerDiv.appendChild(selectOwnerButton);

        ownerResultsContainer.appendChild(innerOwnerDiv);
    });

    createNewUserButtonInit();

}

async function checkForDuplicateOwner(newOwnerData) {
  try {
    const { name, address, dob, license, expire } = newOwnerData;


    const { data, error } = await supabase
      .from('People') 
      .select('PersonID')
      .eq('Name', name)
      .eq('Address', address)
      .eq('DOB', dob)
      .eq('LicenseNumber', license)
      .eq('ExpiryDate', expire); 

    if (error) {
      console.error('Error checking for duplicate owner:', error);
      displayOwnerMessage('Error: Database query failed'); 
      return true; 
    }

    if (data && data.length > 0) {

      displayOwnerMessage('Error: Duplicate Already Exists');
      return true;
    }


    return false;

  } catch (err) {
    console.error('Unexpected error:', err);
    displayOwnerMessage('Error: An unexpected error occurred');
    return true;
  }
}

async function submitNewOwnerData(){
    let newInputs = [];
    let ownerInputs = ['personid','name','address','dob','license','expire'];
    ownerInputs.forEach(key => {
        let inputVal = document.getElementById(key).value.trim();
        newInputs.push(inputVal);
    });

    let hasNull = false;
    newInputs.forEach(input => {
        if (input===''){
            hasNull = true;
        }
        
    });
 
    if (hasNull){
        displayOwnerMessage('Error: Empty Data Field');
        return;
    }

    if (await checkForDuplicateOwner(newInputs)){
        return;
    }

    console.log('need to save the new owner');
    console.log(newInputs);
    console.log(newInputs[0]);

    try {
        const { data, error } = await supabase
            .from('People')
            .insert([
                {
                    PersonID: newInputs[0],
                    Name: newInputs[1],
                    Address: newInputs[2],
                    DOB: newInputs[3],
                    LicenseNumber: newInputs[4],
                    ExpiryDate: newInputs[5]
                }
            ])
            .select('PersonID');

        if (error) {
            displayOwnerMessage('Error: Failed to add new owner.');
        }

        if (data && data.length > 0) {
            const newPersonId = data[0].PersonID;
            console.log(`New owner added with ID: ${newPersonId}`);
            displayOwnerMessage('Owner added successfully!');

            document.getElementById('newUserInputForm').innerHTML = '';
            ownerID = newPersonId;
        } else {
            console.error("Error: No PersonID returned after insert.");
            displayOwnerMessage('Error: Could not retrieve new owner ID.');
            return;
        }

    } catch (error) {
        console.error("Unexpected error:", error);
        displayOwnerMessage('Error: An unexpected error occurred.');
        return;
    }
}


function createNewUserInputForm(){
    let inputContainer = document.getElementById('newUserInputForm');
    let userInputs = ['personid','name','address','dob','license','expire'];

    userInputs.forEach(key => {
        let innerDiv = document.createElement('div');
        
        let label = document.createElement('label');
        label.setAttribute('for',key);
        label.textContent = `${key}: `;

        innerDiv.appendChild(label);

        let input = document.createElement('input');
        input.id = key;

        innerDiv.appendChild(input);

        inputContainer.appendChild(innerDiv);
    });

    let addOwnerButton = document.createElement('button');
    addOwnerButton.id='createNewOwnerBut';
    addOwnerButton.textContent = 'Add owner';

    addOwnerButton.addEventListener('click',function(){
        submitNewOwnerData();
    })

    inputContainer.appendChild(addOwnerButton);

}

function createNewUser(){
    // create the input form
    document.getElementById('newUserInputForm').innerHTML='';
    createNewUserInputForm();

    //get the new Inputs
    // then check there isnt already someone with the same data
    // if there isnt anyone create the new user
    // then create the new vehicle
}

function createNewUserButtonInit(){
    let newBut = document.createElement('button');
    newBut.id='createNewOwnerForm';
    newBut.textContent='New owner';
    newBut.addEventListener('click',()=>{
        createNewUser();
    })
    
    document.getElementById('newOwnerButContainer').appendChild(newBut);

}

checkOwnerBut.addEventListener('click',async()=>{
    document.getElementById('owner-results').innerHTML='';
    document.getElementById('newUserInputForm').innerHTML='';
    document.getElementById('newOwnerButContainer').innerHTML='';

   

    let results = await getOwnerMatches();
    if (results.length!=0){
        console.log('matches found');
        displayOwners(results);
    }

    else{
        displayOwnerMessage('Need to create a new owner');
        createNewUserButtonInit();

    } 
})

async function addVehicleToDb(){
    if (ownerID===null){
        displayVehicleMessage('Error:No Owner Selected');
        createNewUser();
    }

    console.log(`need to add vehicle to ownerid: ${ownerID}`);

    let newInputs = [];
    let vehicleInputs = ['rego','make','model','colour'];
    vehicleInputs.forEach(key => {
        let inputVal = document.getElementById(key).value.trim();
        newInputs.push(inputVal);
    });

    let hasNull = false;
    newInputs.forEach(input => {
        if (input===''){
            hasNull = true;
        }
        
    });
 
    if (hasNull){
        displayVehicleMessage('Error: Empty Data Field');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('Vehicles')
            .insert([
                {
                    VehicleID: newInputs[0],
                    Make: newInputs[1],
                    Model: newInputs[2],
                    Colour: newInputs[3],
                    OwnerID: ownerID
                }
            ])

        if (error) {
            displayVehicleMessage(`ErrorL ${error}`); 
        }
    
    } catch (error) {
        console.error("Unexpected error:", error);
        displayOwnerMessage('Error: An unexpected error occurred.');
        return;
    }

    displayVehicleMessage('Vehicle added successfully!');

}

addVehicleBut.addEventListener('click',async ()=>{
    addVehicleToDb();
});
