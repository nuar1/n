// ===== SLIDING DOOR EXPERTS JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initHamburgerMenu();
    initTestimonialSwiper();
    initFormValidation();
    initZipCodeValidator();
    initLiveChat();
    initScrollAnimations();
    initMobileCTAs();
    initPhoneButtons();
});

// ===== STICKY HEADER FUNCTIONALITY =====
function initStickyHeader() {
    const header = document.getElementById('mainHeader');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shrink class when scrolled
        if (scrollTop > 100) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== HAMBURGER MENU FUNCTIONALITY =====
function initHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navCollapse = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const bsCollapse = new bootstrap.Collapse(navCollapse, {
                hide: true
            });
        });
    });
    
    // Add slide-down animation
    navCollapse.addEventListener('show.bs.collapse', function() {
        hamburgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    navCollapse.addEventListener('hide.bs.collapse', function() {
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// ===== TESTIMONIAL SWIPER INITIALIZATION =====
function initTestimonialSwiper() {
    if (typeof Swiper !== 'undefined') {
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = quoteForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });
            
            // Validate email
            const emailField = quoteForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                if (!isValidEmail(emailField.value)) {
                    isValid = false;
                    showFieldError(emailField, 'Please enter a valid email address');
                }
            }
            
            // Validate phone
            const phoneField = quoteForm.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value) {
                if (!isValidPhone(phoneField.value)) {
                    isValid = false;
                    showFieldError(phoneField, 'Please enter a valid phone number');
                }
            }
            
            if (isValid) {
                submitForm(data);
            }
        });
    }
}

// ===== ZIP CODE VALIDATOR =====
function initZipCodeValidator() {
    const zipField = document.getElementById('zipCode');
    const serviceAreas = ['33903', '33904', '33905', '33914', '33919', '33928', '34135', '34134', '34102'];
    
    if (zipField) {
        zipField.addEventListener('blur', function() {
            const zipCode = this.value.trim();
            
            if (zipCode && !serviceAreas.includes(zipCode)) {
                showZipCodeWarning(zipCode);
            } else {
                clearZipCodeWarning();
            }
        });
    }
}

// ===== LIVE CHAT FUNCTIONALITY =====
function initLiveChat() {
    const chatBubble = document.getElementById('liveChatBubble');
    
    if (chatBubble) {
        chatBubble.addEventListener('click', function() {
            // Simulate chat opening
            showChatModal();
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    const whyChooseItems = document.querySelectorAll('.why-choose-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply initial styles and observe
    [...serviceCards, ...whyChooseItems].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== MOBILE CTA FUNCTIONALITY =====
function initMobileCTAs() {
    const mobileCTAs = document.getElementById('mobileCtas');
    let lastScrollTop = 0;
    
    if (mobileCTAs && window.innerWidth < 992) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide mobile CTAs based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                mobileCTAs.style.transform = 'translateY(100%)';
            } else {
                mobileCTAs.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// ===== PHONE BUTTON ANIMATIONS =====
function initPhoneButtons() {
    const phoneButtons = document.querySelectorAll('[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        // Add click tracking
        button.addEventListener('click', function() {
            trackPhoneClick(this.href);
        });
        
        // Add ripple effect on mobile
        if ('ontouchstart' in window) {
            button.addEventListener('touchstart', createRippleEffect);
        }
    });
}

// ===== UTILITY FUNCTIONS =====

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function showZipCodeWarning(zipCode) {
    const zipField = document.getElementById('zipCode');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'form-text text-warning';
    warningDiv.innerHTML = `<i class="fas fa-exclamation-triangle me-1"></i>We may charge additional travel fees for ${zipCode}. <a href="tel:+1-239-555-0123">Call to confirm</a>.`;
    
    // Remove existing warning
    clearZipCodeWarning();
    
    zipField.parentNode.appendChild(warningDiv);
}

function clearZipCodeWarning() {
    const zipField = document.getElementById('zipCode');
    const existingWarning = zipField.parentNode.querySelector('.form-text');
    if (existingWarning) {
        existingWarning.remove();
    }
}

function submitForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('#quoteForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        
        // Reset form
        document.getElementById('quoteForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track conversion
        trackFormSubmission(data);
    }, 2000);
}

function showSuccessMessage() {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Success!</strong> Your quote request has been sent. We'll contact you within 30 minutes.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('quoteForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showChatModal() {
    // Create chat modal
    const modalHTML = `
        <div class="modal fade" id="chatModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-comments me-2"></i>Chat with Sliding Door Experts
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="chat-options">
                            <p class="mb-3">How would you like to get help today?</p>
                            <div class="d-grid gap-2">
                                <a href="tel:+1-239-555-0123" class="btn btn-primary">
                                    <i class="fas fa-phone me-2"></i>Call Now - Fastest Response
                                </a>
                                <a href="sms:+1-239-555-0123?body=Hi, I need help with my sliding door" class="btn btn-outline-primary">
                                    <i class="fas fa-sms me-2"></i>Send Text Message
                                </a>
                                <a href="#quote-form" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    <i class="fas fa-calculator me-2"></i>Get Free Quote
                                </a>
                            </div>
                        </div>
                        <hr>
                        <div class="contact-info text-center">
                            <p class="mb-1"><strong>Available 24/7</strong></p>
                            <p class="text-muted mb-0">Emergency repairs • Same-day service</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page if it doesn't exist
    if (!document.getElementById('chatModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Show modal
    const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
    chatModal.show();
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== TRACKING FUNCTIONS =====
function trackPhoneClick(phoneNumber) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            'event_category': 'contact',
            'event_label': phoneNumber,
            'value': 1
        });
    }
    
    console.log('Phone click tracked:', phoneNumber);
}

function trackFormSubmission(data) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'lead_generation',
            'event_label': 'quote_form',
            'value': 1
        });
    }
    
    console.log('Form submission tracked:', data);
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-close-white {
        filter: invert(1) grayscale(100%) brightness(200%);
    }
    
    .alert {
        border-radius: 8px;
        border: none;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .alert-success {
        background-color: #d1edff;
        color: #0c5460;
        border-left: 4px solid #28a745;
    }
    
    .modal-content {
        border-radius: 12px;
        border: none;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    
    .chat-options .btn {
        border-radius: 8px;
        padding: 0.75rem 1rem;
        font-weight: 500;
    }
    
    .invalid-feedback {
        display: block;
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .is-invalid {
        border-color: #dc3545;
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== EMERGENCY CONTACT BANNER VISIBILITY =====
function initEmergencyBanner() {
    const emergencyBanner = document.querySelector('.emergency-cta');
    
    if (emergencyBanner) {
        const observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-pulse');
                        setTimeout(() => {
                            entry.target.classList.remove('animate-pulse');
                        }, 2000);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        observer.observe(emergencyBanner);
    }
}

// Initialize emergency banner on load
initEmergencyBanner();

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
window.addEventListener('load', function() {
    // Preload hero background image
    const heroImg = new Image();
    heroImg.src = 'https://images.unsplash.com/photo-1558618666-8c61e3b3e7c3?w=1920&h=1080&fit=crop';
    
    // Initialize additional features after page load
    setTimeout(initEmergencyBanner, 1000);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.warn('Script error handled:', e.error);
    
    // Fallback functionality for critical features
    if (e.error && e.error.message.includes('Swiper')) {
        // Fallback for testimonial slider
        console.log('Swiper failed to load, implementing fallback');
        initFallbackTestimonials();
    }
});

function initFallbackTestimonials() {
    const testimonialCards = document.querySelectorAll('.swiper-slide');
    if (testimonialCards.length > 0) {
        let currentIndex = 0;
        
        testimonialCards.forEach((card, index) => {
            card.style.display = index === 0 ? 'block' : 'none';
        });
        
        setInterval(() => {
            testimonialCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialCards[currentIndex].style.display = 'block';
        }, 8000);
    }
}

console.log('Sliding Door Experts website initialized successfully! 🚪');
