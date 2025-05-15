import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const searchButton = document.querySelector('#regoSearchButton');
const supabaseUrl = 'https://lsgihxghcclaurdxaspt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2loeGdoY2NsYXVyZHhhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTIzNTcsImV4cCI6MjA2MDM4ODM1N30.bdrNA24cKN0CaBiTvL2uOidstWL7-Dnkb3N1YW_J50I';
const supabase = createClient(supabaseUrl, supabaseKey);

function displaySearchError(message) {
    document.getElementById('message').textContent = 'Error: ' + message;
}

function validateInput(){
    const rego = document.getElementById('rego').value.trim();
    if (!Boolean(rego)){

        return false;
    }

    return true;

}

function getSearchInput(){
    return document.getElementById('rego').value.trim();
}

async function getDatabaseData(searchArg){
    const { data, error } = await supabase.from('Vehicles')
                                            .select('*')
                                            .ilike('VehicleID',`%${searchArg}%`);
    return data;
}

async function getSearchResults(){
    const searchArg = getSearchInput();
    const data = await getDatabaseData(searchArg);
    return data;
}

function displayResults(data){
    const resultsDiv = document.getElementById('results');


    data.forEach(vehicle => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.classList.add('flex-container','record');

        Object.entries(vehicle).forEach(([key, value]) => {
            const fieldP = document.createElement('p');
            fieldP.textContent = `${key}: ${value}`;
            vehicleDiv.appendChild(fieldP);
            document.getElementById('message').textContent = 'Search successful';
        });

        resultsDiv.appendChild(vehicleDiv);
    });
}

searchButton.addEventListener('click',async () =>{
    const results = document.getElementById('results');
    results.innerHTML = '';
    if (validateInput()){
        const searchResults = await getSearchResults();
        if (searchResults.length!==0){
            displayResults(searchResults);
        }
        else{
            displaySearchError('No Vehicle Found');
        }

    }
    else {
        displaySearchError('No Search Argument Provided');
    }
});






