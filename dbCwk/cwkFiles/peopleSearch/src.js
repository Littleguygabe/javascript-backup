import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const searchButton = document.querySelector('#searchButton');
const supabaseUrl = 'https://lsgihxghcclaurdxaspt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzZ2loeGdoY2NsYXVyZHhhc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MTIzNTcsImV4cCI6MjA2MDM4ODM1N30.bdrNA24cKN0CaBiTvL2uOidstWL7-Dnkb3N1YW_J50I';
const supabase = createClient(supabaseUrl, supabaseKey);

function validateInputs() {
    const name = document.getElementById('name').value.trim();
    const license = document.getElementById('license').value.trim();
    return (name && !license) || (!name && license);
}

function getSearchItem() {
    const name = document.getElementById('name').value.trim();
    if (name) {
        return ['name', name];
    } else {
        return ['license', document.getElementById('license').value.trim()];
    }
}

function displaySearchError(message) {
    document.getElementById('message').textContent = 'Error: ' + message;
}

function displaySuccess(message) {
    document.getElementById('message').textContent = message;
}

function searchByName(name, data) {
    return data.filter(row => row.Name.toLowerCase().includes(name.toLowerCase()));
}

function searchByLicense(license, data) {
    return data.filter(row => row.LicenseNumber.toLowerCase().includes(license.toLowerCase()));
}

function filterData(searchTup, data) {
    if (searchTup[0] === 'name') {
        return searchByName(searchTup[1], data);
    } else if (searchTup[0] === 'license') {
        return searchByLicense(searchTup[1], data);
    } else {
        displaySearchError('Wrong Search Input Type');
        return [];
    }
}


// 
function displayResults(results){
    const resultsDiv = document.getElementById('results');
    results.forEach(person => {
        const resultsInnerDiv = document.createElement('div');
        Object.entries(person).forEach(([key,value])=>{
            const newP = document.createElement('p');
            newP.textContent = `${key} : ${value}`;
            
            resultsInnerDiv.appendChild(newP);
        });

        resultsDiv.appendChild(resultsInnerDiv);
    });

}
// 



async function getDatabase() {
    const { data, error } = await supabase.from('People').select('*');
    if (error) {
        console.error('Error:', error);
        return null;
    } else {
        return data;
    }
}

searchButton.addEventListener('click', async () => {
    const ul = document.getElementById('results');
    ul.innerHTML = '';
    document.getElementById('message').textContent = '';

    if (validateInputs()) {
        const data = await getDatabase();

        if (data) {
            const searchTup = getSearchItem();
            const searchResults = filterData(searchTup, data);

            if (searchResults.length !== 0) {
                displayResults(searchResults);
                displaySuccess('Search successful');
            } else {
                displaySearchError('No result found');
            }
        } else {
            displaySearchError('No result found');
        }
    } else {
        displaySearchError('Must provide exactly one search input');
    }
});
