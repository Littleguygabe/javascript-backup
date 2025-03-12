function updatePath(x2, y2) {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const x = canvas.width / 2;
    const y = canvas.height / 2;


    let absWinxPos = window.screenX + x;
    let absWinyPos = window.screenY + y + (window.outerHeight - window.innerHeight) - 30;

    let relXdif = x2 - absWinxPos;
    let relYdif = y2 - absWinyPos;


    let canvasX2 = x + relXdif;
    let canvasY2 = y + relYdif;

    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
    ctx.fill();

    // Draw the line to the other window's position
    ctx.beginPath(); // Start a new path
    ctx.moveTo(x, y); // Move the pen to the center of the canvas
    ctx.lineTo(canvasX2, canvasY2); // Draw a line to the transformed coordinates
    ctx.stroke();

    // just need to make it so that is runs an animation between the 2 points,
    // then if the exact same animation is playing it should line up naturally

    //CURRENTLY TARGETING THE BOTTOM RIGHT CORNER OF THE CANVAS
    
    const keyframes = `
      @keyframes rotatingMotion {
        0% {
            transform: translateX(0) rotate(0deg);
        }
        50% {
            transform: translateX(${canvasX2-x}px) translateY(${canvasY2-y}px) rotate(540deg);
        }
        100% {
            transform: translateX(0) rotate(0deg);
        }
      }
    `;

  // Insert the new keyframe into the head of the document
    const styleSheet = document.styleSheets[0];
    const keyframeRule = styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    console.log("Updated keyframe position to:", canvasX2, canvasY2);

    //also make it so that when one window goes on top of the other draw both dots on 
    //the window so --> if just do on both windows then it doesnt matter as user will only
    //be able to see one windows
}


function resizeCanvas() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // Update canvas size based on window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // After resizing, update the canvas path
    createCircles(20,x,y);
    updatePath();
}

// Set up resize event listener
window.addEventListener('resize', resizeCanvas);

// Initialize the canvas size and draw the initial path
resizeCanvas();

function createCircles(numCircles,x,y) {
  const container = document.body; // You can also select a specific container element if needed
  
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement('div'); // Create a new div element
    circle.classList.add('circle','rotatingMotion'); // Add classes
    
    // Apply the random position
    circle.style.left = `${x}px`;  // Set left position (X axis)
    circle.style.top = `${y}px`;   // Set top position (Y axis)

    // Dynamically set the animation delay
    const delay = Math.random() * 2; // Random delay between 0 and 2 seconds
    circle.style.animationDelay = `${delay}s`;  // Apply the delay to the circle's animation

    container.appendChild(circle); // Append the new circle to the body (or container)
  }
}