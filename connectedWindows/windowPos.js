document.addEventListener("DOMContentLoaded", function() {
    function updateCenter(){
        let windowX = window.screenX;
        let windowY = window.screenY

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let centerX = windowX + windowWidth/2;
        let centerY = windowY + windowHeight/2;

        console.log(centerX,centerY);
        
        requestAnimationFrame(updateCenter);
        //updates in background like setInterval(updateCenter,500)
        // but syncs the update with the browser's rendering loop so looks
        // smoother -> just can't specify update interval
    }

    updateCenter();

    console.log('other code running');

});