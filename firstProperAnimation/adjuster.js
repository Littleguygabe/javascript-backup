function updateKeyframePosition() {
  const newX = Math.random() * 500;  // New random X position (for example)
  const newY = Math.random() * 500;  // New random Y position (for example)

  // Create the new keyframe rule
  const keyframes = `
    @keyframes rotatingMotion {
      0% {
        transform: translateX(0) rotate(0deg);
      }
      50% {
        transform: translateX(${newX}px) translateY(${newY}px) rotate(540deg);
      }
      100% {
        transform: translateX(0) rotate(0deg);
      }
    }
  `;

  // Insert the new keyframe into the head of the document
  const styleSheet = document.styleSheets[0];
  const keyframeRule = styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  console.log("Updated keyframe position to:", newX, newY);
}

function createCircles(numCircles,x,y) {
  const container = document.body; // You can also select a specific container element if needed
  
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement('div'); // Create a new div element
    circle.classList.add('circle', 'colourCoral', 'animate', 'rotatingMotion', 'animate--infinite', 'animate--slow'); // Add classes

    
    // Apply the random position
    circle.style.left = `${x}px`;  // Set left position (X axis)
    circle.style.top = `${y}px`;   // Set top position (Y axis)

    // Dynamically set the animation delay
    const delay = Math.random() * 2; // Random delay between 0 and 2 seconds
    circle.style.animationDelay = `${delay}s`;  // Apply the delay to the circle's animation

    container.appendChild(circle); // Append the new circle to the body (or container)
  }
}

// Call the function to create circles when the page loads
createCircles(20,300,300);  // Change 6 to whatever number of circles you want

