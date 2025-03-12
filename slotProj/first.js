document.addEventListener("DOMContentLoaded", function() {
    let x = 0;
    let y = 0;
    let x2 = 0;
    let y2 = 0;

    const box = document.getElementById('box1');
    const box2 = document.getElementById('box2'); 
    const container = document.getElementById('container');

    // Check if box elements are found
    if (!box || !box2) {
        console.error("Box element not found!");
        return; // Stop execution if boxes are not found
    }

    // Set initial positions for box2 (bottom-right corner)
    box2.style.left = `${container.offsetWidth - box2.offsetWidth}px`;
    box2.style.top = `${container.offsetHeight - box2.offsetHeight}px`;

    // Movement states for both boxes
    let moveBox1 = { up: false, down: false, left: false, right: false };
    let moveBox2 = { up: false, down: false, left: false, right: false };

    // Listen for keydown events to track which keys are pressed
    document.addEventListener('keydown', function(event) {
        if (event.key == 'ArrowUp') {
            moveBox1.up = true;
        }
        else if (event.key == 'ArrowDown') {
            moveBox1.down = true;
        }
        else if (event.key == 'ArrowLeft') {
            moveBox1.left = true;
        }
        else if (event.key == 'ArrowRight') {
            moveBox1.right = true;
        }
        else if (event.key == 'w') {
            moveBox2.up = true;
        }
        else if (event.key == 's') {
            moveBox2.down = true;
        }
        else if (event.key == 'a') {
            moveBox2.left = true;
        }
        else if (event.key == 'd') {
            moveBox2.right = true;
        }
    });

    // Listen for keyup events to stop the movement when keys are released
    document.addEventListener('keyup', function(event) {
        if (event.key == 'ArrowUp') {
            moveBox1.up = false;
        }
        else if (event.key == 'ArrowDown') {
            moveBox1.down = false;
        }
        else if (event.key == 'ArrowLeft') {
            moveBox1.left = false;
        }
        else if (event.key == 'ArrowRight') {
            moveBox1.right = false;
        }
        else if (event.key == 'w') {
            moveBox2.up = false;
        }
        else if (event.key == 's') {
            moveBox2.down = false;
        }
        else if (event.key == 'a') {
            moveBox2.left = false;
        }
        else if (event.key == 'd') {
            moveBox2.right = false;
        }
    });

    // Update positions continuously
    function updatePosition() {
        if (moveBox1.up) y -= 10;
        if (moveBox1.down) y += 10;
        if (moveBox1.left) x -= 10;
        if (moveBox1.right) x += 10;

        if (moveBox2.up) y2 -= 10;
        if (moveBox2.down) y2 += 10;
        if (moveBox2.left) x2 -= 10;
        if (moveBox2.right) x2 += 10;

        // Apply new positions
        box.style.left = `${x}px`;        
        box.style.top = `${y}px`;

        box2.style.left = `${x2}px`;        
        box2.style.top = `${y2}px`;
    }

    // Call updatePosition every 50ms to update the boxes
    setInterval(updatePosition, 50);
});

