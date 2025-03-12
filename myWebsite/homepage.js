document.addEventListener("DOMContentLoaded", () => {
  const rocket = document.getElementById("rocketAnimation");
  let currentRotation = 0;
  let intervalId = null;

  const rotateRocket = (direction) => {
    currentRotation += direction;
    rocket.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
  };

  document.addEventListener("keydown", (event) => {
    if (intervalId) return; // Prevent multiple intervals
    if (event.key === "ArrowRight") {
      intervalId = setInterval(() => rotateRocket(15), 50); // Rotate clockwise
    } else if (event.key === "ArrowLeft") {
      intervalId = setInterval(() => rotateRocket(-15), 50); // Rotate counterclockwise
    } else if (event.key === "ArrowUp") {
      currentRotation = 0;
      rocket.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    } else if (event.key === "ArrowDown") {
      currentRotation = 180;
      rocket.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
    }
  });

  document.addEventListener("keyup", () => {
    clearInterval(intervalId); // Stop rotation when key is released
    intervalId = null;
  });
});

