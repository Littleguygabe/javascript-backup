document.addEventListener("DOMContentLoaded", function() {
    function updateCenter() {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');

        // Get the center of the canvas
        const x = canvas.width / 2;
        const y = canvas.height / 2;

        // Calculate the absolute window position considering the canvas
        let absWinxPos = window.screenX + x;
        let absWinyPos = window.screenY + y + (window.outerHeight - window.innerHeight) - 30;

        // Send position to the server
        sendMessage(`${absWinxPos},${absWinyPos}`);

        // Request the next animation frame
        requestAnimationFrame(updateCenter);
    }

    // Start the update loop
    updateCenter();  // Only call it once to start the loop
});
