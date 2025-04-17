import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const searchButton = document.querySelector('#searchButton');
const supabaseUrl = 'https://lsgihxghcclaurdxaspt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2loeGdoY2NsYXVyZHhhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTIzNTcsImV4cCI6MjA2MDM4ODM1N30.bdrNA24cKN0CaBiTvL2uOidstWL7-Dnkb3N1YW_J50I';
const supabase = createClient(supabaseUrl, supabaseKey);


function validateInputs(){
    const name = document.getElementById('nameSearchEntry').value;
    const license = document.getElementById('licenseNumSearchEntry').value;
    return Boolean(name)!==Boolean(license); 
} 

function getSearchItem(){
    const name = document.getElementById('nameSearchEntry').value;
    if (Boolean(name)){
        return name;
    }

    else{
        return document.getElementById('licenseNumSearchEntry').value;
    }
}

searchButton.addEventListener('click',()=>{
    if (validateInputs()){
        getDatabase();
    }
    else{
        console.log('Must have only 1 search argument');
    }
});

function displayData(data){
    const ul = document.getElementById('resultsList');
    ul.innerHTML = '';

    data.forEach(person => {
        const parentli = document.createElement('li');
        const childul = document.createElement('ul');
        
        Object.entries(person).forEach(([key,value])=>{
            const childli = document.createElement('li');
            childli.textContent = `${value}`;
            childul.appendChild(childli);
        });
    parentli.appendChild(childul); 
    ul.appendChild(parentli);
    });
}

async function getDatabase() {
    const data = await getDataRows(); 
    if (data) {
        //need to filter the database
        displayData(data);

    }
}

async function getDataRows(){

    const { data, error } = await supabase.from('People').select('*');
    if (error) {
        console.error('Error:', error);
        return null;
    } else {
        return data;
    }
}


window.getDatabase = getDatabase;
