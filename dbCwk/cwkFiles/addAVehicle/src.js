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

checkOwnerBut.addEventListener('click',async ()=>{
    // check if owner exists
    const results = await getMatches();
    if (results.length){    
        console.log('need to display results');
    }
    else{
        console.log('need to create a new user')
    }
});
