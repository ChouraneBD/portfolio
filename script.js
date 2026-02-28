// Custom Cursor Logic (Already in HTML but kept here for completeness, though we can just add general JS)
document.addEventListener('DOMContentLoaded', () => {
    // Menu interactions
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            menuOverlay.classList.toggle('active');

            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (menuBtn.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                menuOverlay.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to specific elements
    const animElements = document.querySelectorAll('.project-card, .exp-item, .contact-left, .contact-right, .intro-left, .intro-right');

    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Magnetic Button Effect (Optional pro touch for social buttons)
    const magnets = document.querySelectorAll('.social-btn, .menu-btn');

    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', function (e) {
            const position = magnet.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px) scale(1.1)`;
        });

        magnet.addEventListener('mouseout', function (e) {
            magnet.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const text = "FULL STACK DEVELOPER";
        let isDeleting = false;
        let textIndex = 0;
        let typingSpeed = 150;

        function type() {
            const currentText = text.substring(0, textIndex);
            typeWriterElement.textContent = currentText;

            let currentSpeed = typingSpeed;
            if (isDeleting) {
                currentSpeed /= 2; // Delete faster than typing
            }

            // If word is complete
            if (!isDeleting && textIndex === text.length) {
                currentSpeed = 2000; // Pause at end before deleting
                isDeleting = true;
            } else if (isDeleting && textIndex === 0) {
                isDeleting = false;
                currentSpeed = 500; // Pause before typing starts again
            }

            if (isDeleting) {
                textIndex--;
            } else {
                textIndex++;
            }

            setTimeout(type, currentSpeed);
        }

        setTimeout(type, 1000); // Start delay
    }
});