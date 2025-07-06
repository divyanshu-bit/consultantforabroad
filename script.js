// Animate map pins sequentially
function animateMapPins() {
    const pins = document.querySelectorAll('.map-dot');
    pins.forEach((pin, index) => {
        pin.style.animationDelay = `${index * 0.6}s`;
        pin.style.animationName = 'pinAppear';
        pin.style.animationDuration = '0.6s';
        pin.style.animationFillMode = 'forwards';
        pin.style.animationTimingFunction = 'ease-out';
    });

    // Animate connecting lines after pins appear
    const lines = document.querySelector('.map-lines');
    if (lines) {
        lines.style.animationDelay = `${pins.length * 0.6}s`;
        lines.style.animationName = 'linesFadeIn';
        lines.style.animationDuration = '0.8s';
        lines.style.animationFillMode = 'forwards';
    }
}

function animateMapPins() {
    const pins = document.querySelectorAll('.map-dot');
    pins.forEach((pin, index) => {
        pin.style.animationDelay = `${index * 0.6}s`;
        pin.style.animationName = 'pinAppear';
        pin.style.animationDuration = '0.6s';
        pin.style.animationFillMode = 'forwards';
        pin.style.animationTimingFunction = 'ease-out';
    });

    const lines = document.querySelector('.map-lines');
    if (lines) {
        lines.style.animationDelay = `${pins.length * 0.6}s`;
        lines.style.animationName = 'linesFadeIn';
        lines.style.animationDuration = '0.8s';
        lines.style.animationFillMode = 'forwards';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    animateMapPins();

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.scrollToSection = function scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Slideshow for contact form images
    const slideshowContainer = document.getElementById('contactImageSlideshow');
    if (slideshowContainer) {
        const images = slideshowContainer.querySelectorAll('img');
        let currentIndex = 0;
        const totalImages = images.length;

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            showImage(currentIndex);
        }

        showImage(currentIndex);
        setInterval(nextImage, 3000);
    }

    // Other existing code...
});

// Quiz form submission and scoring logic
document.getElementById('countryQuizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Initialize scores for countries
    const scores = {
        usa: 0,
        uk: 0,
        canada: 0,
        australia: 0,
        germany: 0
    };

    // Helper function to add points to countries
    function addPoints(value) {
        if (!value) return;
        const parts = value.split('_');
        for (let i = 0; i < parts.length; i += 2) {
            const country = parts[i];
            const points = parseInt(parts[i + 1], 10);
            if (scores.hasOwnProperty(country)) {
                scores[country] += points;
            }
        }
    }

    // Get selected values
    const tuition = document.getElementById('tuition').value;
    const pr = document.getElementById('pr').value;
    const english = document.getElementById('english').value;
    const program = document.getElementById('program').value;
    const work = document.getElementById('work').value;

    // Add points based on selections
    addPoints(tuition);
    addPoints(pr);
    addPoints(english);
    addPoints(program);
    addPoints(work);

    // Determine the country with the highest score
    let maxScore = -1;
    let recommendedCountry = '';
    for (const country in scores) {
        if (scores[country] > maxScore) {
            maxScore = scores[country];
            recommendedCountry = country;
        }
    }

    // Map country codes to display names
    const countryNames = {
        usa: 'United States',
        uk: 'United Kingdom',
        canada: 'Canada',
        australia: 'Australia',
        germany: 'Germany'
    };

    // Display the result
    const resultDiv = document.getElementById('quizResult');
    const quizResultCard = document.getElementById('quizResultCard');
    resultDiv.style.display = 'block';

    // Country-specific messages
    const countryMessages = {
        usa: {
            title: "🎓 United States is Your Best-Fit Study Destination!",
            points: [
                "Top universities like UC Berkeley, NYU, MIT",
                "Strong GMAT, GRE, SAT coaching",
                "Diverse study programs",
                "Vibrant campus life"
            ],
            cta: "👉 Book Free Counseling Now to learn how to apply!"
        },
        uk: {
            title: "🎓 United Kingdom is Your Best-Fit Study Destination!",
            points: [
                "High IELTS scores pave your way",
                "Prestigious universities like Oxford, UCL, Warwick",
                "Rich cultural experience",
                "Strong post-study work opportunities"
            ],
            cta: "👉 Book Free Counseling Now to learn how to apply!"
        },
        canada: {
            title: "🎓 Canada is Your Best-Fit Study Destination!",
            points: [
                "Affordable tuition",
                "High PR chances",
                "Top schools like UBC, McGill",
                "Friendly visa policies"
            ],
            cta: "👉 Book Free Counseling Now to learn how to apply!"
        },
        australia: {
            title: "🎓 Australia is Your Best-Fit Study Destination!",
            points: [
                "Excellent TOEFL/IELTS preparation",
                "Top universities like UNSW, ANU, Monash",
                "Supportive student visa policies",
                "Vibrant multicultural environment"
            ],
            cta: "👉 Book Free Counseling Now to learn how to apply!"
        },
        germany: {
            title: "🎓 Germany is Your Best-Fit Study Destination!",
            points: [
                "Affordable or no tuition fees",
                "Strong engineering and technical programs",
                "Universities like TU Munich, RWTH Aachen",
                "Opportunities for internships and work"
            ],
            cta: "👉 Book Free Counseling Now to learn how to apply!"
        }
    };

    const message = countryMessages[recommendedCountry] || {
        title: "🎓 Study Destination Recommendation",
        points: [],
        cta: ""
    };

    // Build the dynamic card HTML
    let pointsHtml = "";
    message.points.forEach(point => {
        pointsHtml += `<li>${point}</li>`;
    });

    quizResultCard.innerHTML = `
        <h3>${message.title}</h3>
        <ul>${pointsHtml}</ul>
        <button class="btn btn-primary" onclick="window.location.href='tel:+15551234567'">${message.cta}</button>
    `;

    // Add animation class for smooth appearance
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 10);

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
});

// Retake Quiz button logic
document.getElementById('retakeQuizBtn').addEventListener('click', function() {
    const resultDiv = document.getElementById('quizResult');
    const recommendedCountryP = document.getElementById('recommendedCountry');
    const form = document.getElementById('countryQuizForm');

    // Hide result with animation
    resultDiv.classList.remove('show');
    setTimeout(() => {
        resultDiv.style.display = 'none';
        recommendedCountryP.textContent = '';
    }, 500);

    // Reset form
    form.reset();

    // Scroll back to quiz form
    form.scrollIntoView({ behavior: 'smooth' });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            
            // Animate country stats when country cards are visible
            if (entry.target.classList.contains('country-card')) {
                const countryStats = entry.target.querySelectorAll('.stat-value');
                countryStats.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target, 1500);
                });
            }
        }
    });
}, observerOptions);

// Enhanced animated counter for statistics
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Enhanced floating particles for hero section
function createEnhancedParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 3;
        const opacity = Math.random() * 0.8 + 0.2;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 4;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(249, 115, 22, ${opacity}), rgba(251, 146, 60, ${opacity * 0.5}));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: enhancedFloat ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(249, 115, 22, ${opacity * 0.5});
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add enhanced CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes enhancedFloat {
            0%, 100% {
                transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                opacity: 0.7;
            }
            25% {
                transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.1);
                opacity: 1;
            }
            50% {
                transform: translateY(-60px) translateX(-10px) rotate(180deg) scale(0.9);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-30px) translateX(-25px) rotate(270deg) scale(1.05);
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced card hover effects
function addEnhancedHoverEffects() {
    document.querySelectorAll('.service-card, .country-card, .feature-item').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
            
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.8s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 800);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// Enhanced button effects
function addEnhancedButtonEffects() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create multiple ripples for enhanced effect
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height) * 1.5;
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: radial-gradient(circle, rgba(255, 255, 255, ${0.4 - i * 0.1}) 0%, transparent 70%);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: enhancedRipple 0.8s ease-out;
                        pointer-events: none;
                        z-index: 10;
                    `;
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.remove();
                        }
                    }, 800);
                }, i * 100);
            }
        });
    });
}

// Enhanced parallax effect
function addEnhancedParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroParticles = document.querySelector('.hero-particles');
        const animatedShapes = document.querySelector('.animated-shapes');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        if (animatedShapes) {
            animatedShapes.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.05}deg)`;
        }
        
        // Parallax for floating elements
        document.querySelectorAll('.float-item').forEach((item, index) => {
            const speed = 0.1 + (index * 0.05);
            item.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Enhanced form interactions
function addEnhancedFormEffects() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            const glow = this.nextElementSibling;
            if (glow && glow.classList.contains('input-glow')) {
                glow.style.opacity = '0.2';
                glow.style.transform = 'scale(1.02)';
            }
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            const glow = this.nextElementSibling;
            if (glow && glow.classList.contains('input-glow')) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(1)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Enhanced scroll animations
function addEnhancedScrollAnimations() {
    const elements = document.querySelectorAll('.section-title, .mission-text, .mission-highlight, .service-card, .country-card, .feature-item, .hero');
    
    elements.forEach((el, index) => {
        observer.observe(el);
        
        // Add stagger effect
        if (el.classList.contains('service-card')) {
            el.style.animationDelay = `${(index % 4) * 0.2}s`;
        } else if (el.classList.contains('country-card')) {
            el.style.animationDelay = `${(index % 5) * 0.15}s`;
        } else if (el.classList.contains('feature-item')) {
            el.style.animationDelay = `${(index % 4) * 0.1}s`;
        }
    });
}

// Form submission with enhanced feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Enhanced loading state
    submitButton.innerHTML = `
        <span style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            Sending...
        </span>
    `;
    submitButton.disabled = true;

    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);

    setTimeout(() => {
        // Success animation
        submitButton.innerHTML = `
            <span style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 20px; height: 20px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">✓</div>
                Message Sent!
            </span>
        `;

        // Show success message below the button
        formMessage.style.display = 'block';

        // Remove success message and reset form
        setTimeout(() => {
            formMessage.style.display = 'none';
            this.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Reset form states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused', 'has-value');
            });
        }, 3000);
    }, 2000);
});

// Initialize all enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    // Create enhanced particles
    createEnhancedParticles();
    
    // Add enhanced effects
    addEnhancedHoverEffects();
    addEnhancedButtonEffects();
    addEnhancedParallax();
    addEnhancedFormEffects();
    addEnhancedScrollAnimations();
    
    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes enhancedRipple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Enhanced loading animation
    document.body.classList.add('loaded');
    
    // Add smooth reveal for hero elements
    setTimeout(() => {
        document.querySelector('.hero').classList.add('reveal');
    }, 100);
});

// Enhanced resize handler
window.addEventListener('resize', () => {
    // Recalculate particle positions on resize
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
});

// Add mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.animated-shapes .shape').forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Enhanced scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #f97316, #fb923c, #fbbf24);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(249, 115, 22, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}