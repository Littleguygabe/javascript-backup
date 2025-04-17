document.addEventListener('DOMContentLoaded',()=>{

    const hpNavBut = document.querySelector('#homePageNavBut');
    const peopleNavBut = document.querySelector('#peopleNavBut');
    const vehicleNavBut = document.querySelector('#vehicleNavBut');
    const addVehicleNavBut = document.querySelector('#addVehicleNavBut');
    
    hpNavBut.addEventListener('click',()=>{
        console.log('clicked for homepage');
        window.location.href = '../homepage/index.html';
    });
    
    peopleNavBut.addEventListener('click',()=>{
        console.log('clicked for people');
        window.location.href = '../peopleSearch/index.html';
        
    });
    
    vehicleNavBut.addEventListener('click',()=>{
        console.log('clicked for vehicle');
        window.location.href = '../vehicleSearch/index.html';
    });
    
    addVehicleNavBut.addEventListener('click',()=>{
        console.log('clicked for add vehicle');
        window.location.href = '../addAVehicle/index.html';
    });
});
