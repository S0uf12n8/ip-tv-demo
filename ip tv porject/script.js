
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .period-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        scrollAnimationObserver.observe(el);
    });
});

// Smooth navbar background transition on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Add smooth scroll direction detection
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }    lastScrollTop = scrollTop;
}, { passive: true });

// Pricing Toggle (Monthly/Yearly)
const pricingToggle = document.getElementById('pricing-toggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => {
            const monthly = amount.getAttribute('data-monthly');
            const yearly = amount.getAttribute('data-yearly');
            
            if (this.checked) {
                amount.textContent = yearly;
            } else {
                amount.textContent = monthly;
            }
        });
    });
}

// FAQ Accordion with smooth animations
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items with smooth animation
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle clicked item with smooth animation
        if (!isActive) {
            faqItem.classList.add('active');
        } else {
            faqItem.classList.remove('active');
        }
    });
});

// Enhanced smooth scrolling with custom easing
function smoothScrollTo(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    // Easing function for smooth animation
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Parallax scrolling effect for hero section
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-device, .floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// Smooth reveal animations for sections
function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(section);
    });
}

// Initialize smooth scrolling enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced anchor link scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
        });
    });
    
    // Initialize parallax and reveals
    initParallax();
    initSectionReveals();
    
    // Smooth scroll to top on page load if hash is present
    if (window.location.hash) {
        setTimeout(() => {
            smoothScrollTo(window.location.hash);
        }, 100);
    }
});

// Form Validation (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Buy Now Button Handlers (placeholder functionality)
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`Redirecting to checkout for ${planName} plan...`);
        // In a real implementation, this would redirect to a payment processor
    });
});

// Loading Animation Helper
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9,]+/, target.toLocaleString());
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
            }
        }, 16);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Device Detection for Optimizations
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Reduce animations on mobile for better performance
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    // Disable heavy animations on mobile
    const style = document.createElement('style');
    style.textContent = `
        .mobile-device .floating-element {
            animation: none;
        }
        .mobile-device .hero-device {
            animation: none;
        }
    `;
    document.head.appendChild(style);
}

// Lazy Loading for Images (if any images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance Optimization: Debounce Scroll Events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based functionality here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error Handling for Failed Animations
window.addEventListener('error', function(e) {
    console.warn('Animation error caught:', e.error);
    // Fallback: Remove problematic animations
    document.querySelectorAll('.floating-element').forEach(el => {
        el.style.animation = 'none';
    });
});

// Accessibility Improvements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('nav-hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            setTimeout(() => {
                if (navMenu.classList.contains('active')) {
                    const firstLink = navMenu.querySelector('.nav-link');
                    if (firstLink) firstLink.focus();
                }
            }, 100);
        });
    }
});

console.log('StreamMax IPTV Website Loaded Successfully! 🚀');

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Live Chat System
let chatWindow = null;
let chatMessages = null;
let chatInput = null;
let chatSend = null;

// Auto-responses for demo purposes
const chatResponses = [
    "Thanks for contacting StreamMax! I'm here to help you with any questions about our IPTV service.",
    "Our basic plan starts at $15/month with 5,000+ channels. Would you like to know more about our plans?",
    "Yes, we offer a 7-day free trial for new customers. Would you like me to set that up for you?",
    "Our service works on all major devices including Smart TVs, phones, tablets, and streaming devices.",
    "Setup is very easy! We provide step-by-step guides and our support team can help you get started.",
    "All our plans include 24/7 customer support and a 7-day money-back guarantee.",
    "You can upgrade or downgrade your plan anytime from your account dashboard.",
    "We accept all major credit cards and PayPal for secure payments.",
    "Is there anything specific about our service you'd like to know more about?"
];

function openLiveChat() {
    if (!chatWindow) {
        initializeChatWindow();
    }
    
    chatWindow.classList.add('active');
    
    // Auto-focus on input after a short delay
    setTimeout(() => {
        if (chatInput) {
            chatInput.focus();
        }
    }, 300);
}

function initializeChatWindow() {
    chatWindow = document.getElementById('chat-window');
    chatMessages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');
    chatSend = document.getElementById('chat-send');
    
    if (!chatWindow || !chatMessages || !chatInput || !chatSend) {
        console.error('Chat elements not found');
        return;
    }
    
    // Close chat functionality
    const chatClose = document.getElementById('chat-close');
    if (chatClose) {
        chatClose.addEventListener('click', closeLiveChat);
    }
    
    // Send message on button click
    chatSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (chatWindow.classList.contains('active') && 
            !chatWindow.contains(e.target) && 
            !e.target.closest('.btn[onclick="openLiveChat()"]')) {
            closeLiveChat();
        }
    });
}

function closeLiveChat() {
    if (chatWindow) {
        chatWindow.classList.remove('active');
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator and auto-respond
    setTimeout(() => {
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const response = getAutoResponse(message);
            addMessage(response, 'bot');
        }, 1500 + Math.random() * 1000); // Random delay for realism
    }, 500);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const messageP = document.createElement('p');
    messageP.textContent = text;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = getCurrentTime();
    
    contentDiv.appendChild(messageP);
    contentDiv.appendChild(timeSpan);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const typingP = document.createElement('p');
    typingP.innerHTML = 'Agent is typing<span class="typing-dots">...</span>';
    typingP.style.fontStyle = 'italic';
    typingP.style.color = 'var(--text-muted)';
    
    contentDiv.appendChild(typingP);
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getAutoResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (message.includes('price') || message.includes('cost') || message.includes('plan')) {
        return "Our plans start at $15/month for Basic (5,000+ channels), $25/month for Pro (10,000+ channels), and $35/month for Premium (15,000+ channels). All plans include a 7-day free trial!";
    } else if (message.includes('trial') || message.includes('free')) {
        return "Yes! We offer a 7-day free trial for all new customers. You can test our service with full access to see if it's right for you. Would you like me to set that up?";
    } else if (message.includes('device') || message.includes('compatible')) {
        return "Our service works on Smart TVs, Android/iOS devices, Amazon Fire Stick, Apple TV, MAG boxes, computers, and more. You can use up to 5 devices simultaneously with our Pro and Premium plans.";
    } else if (message.includes('quality') || message.includes('4k') || message.includes('hd')) {
        return "We offer HD, 4K, and even 8K streaming quality depending on your plan. Our adaptive streaming ensures the best quality for your internet connection.";
    } else if (message.includes('support') || message.includes('help')) {
        return "We provide 24/7 customer support via live chat, email, and phone. Our team can help with setup, troubleshooting, and any questions you have.";
    } else if (message.includes('cancel') || message.includes('refund')) {
        return "You can cancel anytime with no contracts. We also offer a 7-day money-back guarantee if you're not completely satisfied with our service.";
    } else if (message.includes('setup') || message.includes('install')) {
        return "Setup is easy! We provide detailed guides for each device type, and our support team offers free setup assistance. Most customers are streaming within 5 minutes.";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! Welcome to StreamMax support. I'm here to help you with any questions about our premium IPTV service. What would you like to know?";
    } else if (message.includes('thank')) {
        return "You're very welcome! Is there anything else I can help you with today?";
    } else {
        // Random response from the array
        return chatResponses[Math.floor(Math.random() * chatResponses.length)];
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing code will be here...
    
    // Initialize chat after a short delay to ensure all elements are loaded
    setTimeout(initializeChatWindow, 100);
});