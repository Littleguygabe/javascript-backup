import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://lsgihxghcclaurdxaspt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2loeGdoY2NsYXVyZHhhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTIzNTcsImV4cCI6MjA2MDM4ODM1N30.bdrNA24cKN0CaBiTvL2uOidstWL7-Dnkb3N1YW_J50I';
const supabase = createClient(supabaseUrl, supabaseKey);
const ownerInput = document.getElementById('owner'); 
const checkOwnerBut = document.getElementById('checkOwnerBut');

function changeCheckOwnerState(newState){
    document.getElementById('checkOwnerBut').disabled = !newState;
}

ownerInput.addEventListener('input',()=>{
    if (ownerInput.value.trim()!==''){
        changeCheckOwnerState(true);
    }
    else {
        changeCheckOwnerState(false);
    }
});

async function getMatches(){
    const {data,events} = await supabase.from('People')
                                        .select('*')
                                        .ilike('Name',`%${ownerInput.value.trim()}%`);

    return data

} 
function displayResults(results){
    const resultsUl = document.createElement('ul');
    results.forEach(person => {
        const parentli = document.createElement('li');
        const childul = document.createElement('ul');
        childul.classList.add('flex-container');
        Object.entries(person).forEach(([_,value])=>{
            const childli = document.createElement('li');
            childli.textContent = `${value}`;
            childul.appendChild(childli);
        });

        parentli.appendChild(childul);
        resultsUl.appendChild(parentli);        

    });

    document.getElementById('owner-results').appendChild(resultsUl);

}

function generateNewOwnerForm(){
    const inputFieldsArr = [['name','name'],['address','home address'],['dob','date of birth'],['license','license number'],['expire','license expiry date']];
    const formElement = document.getElementById('new-owner-form');
    formElement.innerHTML = '';
    
    for (const[inputField,label] of inputFieldsArr){
        const newInputDiv = document.createElement('div');
        newInputDiv.classList.add('flex-container');
        newInputDiv.id = `${inputField}-input-div`;

        const newInputLabel = document.createElement('p');
        newInputLabel.textContent = label;

        const newInput = document.createElement('input');
        newInput.id = inputField;

        newInputDiv.appendChild(newInputLabel);
        newInputDiv.appendChild(newInput);

        formElement.appendChild(newInputDiv);

    }

    const ownerMessage = document.createElement('p');
    ownerMessage.id = 'message-owner';
    formElement.appendChild(ownerMessage);
}

function createSubmitNewOwnerButton(){
    const submitDataButton = document.createElement('button');
    submitDataButton.id = 'addOwnerButton';
    submitDataButton.textContent = 'Add Owner';

    submitDataButton.addEventListener('click',()=>{
        submitNewOwnerData();
    });

    document.getElementById('new-owner-form').appendChild(submitDataButton);
}

function displayNewOwnerMessage(message){
    document.getElementById('message-owner').textContent = message;
}

function getArrayOfOwnerInputs(){
    const inputFieldsArr = ['name','address','dob','license','expire'];
    const inputsArr = [];

    for (const inputField of inputFieldsArr){
        const inputElement = document.getElementById(inputField);
        const input = inputElement.value.trim();
        inputsArr.push(input);
    }

    return inputsArr;

}

function arrToLower(arr){
    const cleaned = arr.map(item =>
        typeof item==='string' ? item.toLowerCase() : item
    );

    return cleaned;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
}


async function compareToCurrentOwners(inputs,data){
    inputs = arrToLower(inputs);
    
    for (const record of data){
        const values = Object.values(record);
        const cleaned = arrToLower(values);
        cleaned.shift();
        
        if (arraysEqual(inputs,cleaned)){
            return false;
        }
    }

    return true;
    
}

async function checkNewOwnerInputs(){
    const inputs = getArrayOfOwnerInputs();
    for (const input of inputs){
        if (input===''){
            displayNewOwnerMessage('Error: All Information About the new Owner is Required');
            return false;
        }
    }

    // check there isnt a duplicate
    const {data,events} = await supabase.from('People').select('*');
   
    if (await compareToCurrentOwners(inputs,data)){
        displayNewOwnerMessage('Successfully Create new Owner');
    }
    else{
        displayNewOwnerMessage('Error: Identical Record Already in Database');
        return false;
    }

    return true;

}

function zip(a,b){
    return a.map((value,index) => [value,b[index]]);
}

async function getNewOwnerId(){
    const {data} = await supabase.from('People').select('PersonID');

    const ids = data.map(row => Number(row.PersonID)); 
    const maxVal = Math.max(...ids);

    return (maxVal+1);
}


async function addNewOwnerToDb() {
    let inputs = getArrayOfOwnerInputs();
    const inputFieldsArr = ['PersonID', 'Name', 'Address', 'DOB', 'LicenseNumber', 'ExpiryDate'];

    inputs.unshift(await getNewOwnerId()); // Fix unshift

    const record = Object.fromEntries(zip(inputFieldsArr, inputs)); // Build record object
    console.log(record);

    const { data, error } = await supabase.from('People').insert([record]);
}


async function submitNewOwnerData(){
    const inputValid = await checkNewOwnerInputs();
    if (inputValid){
        addNewOwnerToDb();
    }

    else{
        console.log('invalid inputs');
    }
}

function createNewOwner(){
    generateNewOwnerForm();
    createSubmitNewOwnerButton();
} 

function createNewOwnerInit(){
    const createUserButton = document.createElement('button');
    createUserButton.id = 'createNewOwner';
    createUserButton.textContent = 'New Owner';

    createUserButton.addEventListener('click',()=>{
        createNewOwner();
    }); 
    
    document.getElementById('owner-results').appendChild(createUserButton);

}

checkOwnerBut.addEventListener('click',async ()=>{
    // check if owner exists
    const results = await getMatches();
    document.getElementById('owner-results').innerHTML='';
    if (results.length){
        displayResults(results);
    }
    else{
        createNewOwnerInit();
    }
});
