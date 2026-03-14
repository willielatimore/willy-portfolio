// Add this at the beginning of your main.js file

// Theme Toggle Functionality
const themeSwitch = document.getElementById('checkbox');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
        themeSwitch.checked = true;
    }
} else {
    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        body.classList.add('dark-theme');
        themeSwitch.checked = true;
        localStorage.setItem('theme', 'dark-theme');
    }
}

// Theme switch event
themeSwitch.addEventListener('change', function(e) {
    if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        
        // Update AOS colors for dark theme
        AOS.refresh();
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
        
        // Update AOS colors for light theme
        AOS.refresh();
    }
    
    // Trigger animation for skill bars to refresh
    setTimeout(() => {
        showProgress();
    }, 100);
});

// Update AOS initialization with theme-aware colors
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out',
    // Disable AOS on mobile if performance issues
    disable: window.innerWidth < 768 ? false : false
});

// Add theme-aware RGB variables
function updateThemeRGBVariables() {
    const root = document.documentElement;
    if (body.classList.contains('dark-theme')) {
        root.style.setProperty('--primary-color-rgb', '10, 25, 47');
        root.style.setProperty('--accent-color-rgb', '100, 255, 218');
    } else {
        root.style.setProperty('--primary-color-rgb', '255, 255, 255');
        root.style.setProperty('--accent-color-rgb', '13, 110, 253');
    }
}

// Call on theme change
themeSwitch.addEventListener('change', updateThemeRGBVariables);
updateThemeRGBVariables();

// Rest of your existing JavaScript code follows...
// (Keep all the previous functionality like typing animation, scroll effects, etc.)

// [Paste all your existing JavaScript code here]

// Add a small enhancement for theme transition
document.querySelectorAll('.project-card, .stat-box, .btn, .social-link').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Optional: Add a theme preview tooltip
const themeTooltip = document.createElement('div');
themeTooltip.className = 'theme-tooltip';
themeTooltip.innerHTML = 'Switch to dark/light mode';
document.querySelector('.theme-switch-wrapper').appendChild(themeTooltip);

// Show tooltip on first visit
if (!localStorage.getItem('themeTooltipShown')) {
    setTimeout(() => {
        themeTooltip.classList.add('show');
        setTimeout(() => {
            themeTooltip.classList.remove('show');
        }, 3000);
    }, 2000);
    localStorage.setItem('themeTooltipShown', 'true');
}

// Add tooltip styles
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
    .theme-tooltip {
        position: absolute;
        background-color: var(--accent-color);
        color: var(--primary-color);
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        white-space: nowrap;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-5px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 1000;
    }
    
    .theme-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: var(--accent-color) transparent transparent transparent;
    }
    
    .theme-tooltip.show {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }
    
    .theme-switch-wrapper {
        position: relative;
    }
`;

document.head.appendChild(tooltipStyles);


// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Innovator'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, newTextDelay + 250);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation on scroll
const skillSection = document.querySelector('#skills');
const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.width;
        progressBar.style.width = '0';
        setTimeout(() => {
            progressBar.style.width = value;
        }, 500);
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 2;
    
    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message (you can enhance this)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Project filtering functionality (if you want to add categories)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(project => {
            if (filterValue === 'all' || project.classList.contains(filterValue)) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 100);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Counter animation for statistics
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.about-section');
const statNumbers = document.querySelectorAll('.stat-box h3');
let animated = false;

window.addEventListener('scroll', () => {
    if (!statsSection) return;
    
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 2;
    
    if (sectionPos < screenPos && !animated) {
        statNumbers.forEach(stat => {
            const value = parseInt(stat.innerText);
            animateValue(stat, 0, value, 2000);
        });
        animated = true;
    }
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

images.forEach(img => imageObserver.observe(img));

// Back to top button functionality (optional)
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add this CSS for back to top button (you can add it to your CSS file)
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--accent-color);
        color: var(--primary-color);
        border: none;
        border-radius: 50%;
        font-size: 1.3rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(100, 255, 218, 0.4);
    }
    
    @media (max-width: 768px) {
        .back-to-top {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            bottom: 20px;
            right: 20px;
        }
    }
`;

document.head.appendChild(style);


