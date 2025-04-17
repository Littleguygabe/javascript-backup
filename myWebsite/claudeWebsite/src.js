// Mouse parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Set initial positions
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        element.style.transform = `translateX(0) translateY(0)`;
    });

    // Add mousemove listener
    document.addEventListener('mousemove', (e) => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const x = (window.innerWidth - e.pageX * speed) / 20;
            const y = (window.innerHeight - e.pageY * speed) / 20;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

// Initialize parallax after a short delay
setTimeout(initParallax, 1);

// Typing animation for subtitle
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    
    // Check if element exists
    if (!subtitle) {
        console.error('Could not find .hero-subtitle element');
        return;
    }

    const words = ['Computer Science Student', 'Python Developer', 'Data Scientist', 'Web Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            subtitle.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start the animation
    setTimeout(type, 1000);
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    // ... other initializations
});

// Ensure page starts at top
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Check if it's the "View My Work" button
            if (this.classList.contains('hero-cta')) {
                // Smooth scroll for the "View My Work" button
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Instant scroll for other navigation links
                targetElement.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
            }
        }
    });
});
