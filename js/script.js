// INIT
document.addEventListener('DOMContentLoaded', function () {
    // Safely init AOS; if unavailable, ensure content remains visible
    try {
      if (window.AOS && typeof AOS.init === 'function') {
        AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
      } else {
        document.querySelectorAll('[data-aos]').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }
    } catch (err) {
      document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  
    // year
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  
    // nav toggle and mobile menu handling
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    
    // Toggle mobile menu
    const toggleMobileMenu = () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    };
    
    // Toggle menu on button click
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991) { // Only for mobile
          toggleMobileMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 991 && 
          !nav.contains(e.target) && 
          !navToggle.contains(e.target) &&
          nav.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  
    // Initialize smooth scroll polyfill
    const smoothScroll = new SmoothScroll();
    
    // Enhanced mobile animations and scroll effects
    function setupMobileAnimations() {
      // Only run on mobile
      if (window.innerWidth > 991) return;
      
      // Initialize animation elements
      const animationElements = {
        // Hero section
        '.hero-content h1': 'fade-up',
        '.hero-content p': 'fade-up',
        '.hero-buttons .btn': 'fade-up',
        
        // About section
        '.about-content': 'fade-up',
        '.about-image': 'fade-left',
        
        // Services section
        '.services-header': 'fade-up',
        '.service:nth-child(odd)': 'fade-right',
        '.service:nth-child(even)': 'fade-left',
        
        // Process section
        '.process-header': 'fade-up',
        '.process-step:nth-child(1)': 'fade-up',
        '.process-step:nth-child(2)': 'fade-up',
        '.process-step:nth-child(3)': 'fade-up',
        '.process-step:nth-child(4)': 'fade-up',
        
        // Testimonials
        '.testimonials-header': 'fade-up',
        '.testimonial-card': 'fade-up',
        
        // Contact section
        '.contact-header': 'fade-up',
        '.contact-form': 'fade-up',
        '.contact-info': 'fade-up'
      };
      
      // Apply animation classes
      Object.entries(animationElements).forEach(([selector, animation], index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
          el.setAttribute('data-aos', animation);
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
          if (i > 0) {
            el.style.transitionDelay = `${i * 0.1}s`;
          }
        });
      });
      
      // Handle scroll animations
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Check if element is in viewport
          if (elementTop < windowBottom && elementBottom > windowTop) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
        
        // Parallax effect for hero background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
          const scrollPosition = window.scrollY;
          heroBg.style.transform = `translate3d(0, ${scrollPosition * 0.3}px, 0)`;
        }
      };
      
      // Initial animation check
      animateOnScroll();
      
      // Throttle scroll events
      let isScrolling;
      window.addEventListener('scroll', () => {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(animateOnScroll);
      }, { passive: true });
      
      // Animate on load
      setTimeout(animateOnScroll, 300);
      
          // Add tap feedback to interactive elements
      const interactiveElements = document.querySelectorAll('.btn, .service, .testimonial-card, .process-step');
      interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease';
        
        el.addEventListener('touchstart', () => {
          el.style.transform = 'scale(0.97)';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }, { passive: true });
        
        el.addEventListener('touchend', () => {
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }, { passive: true });
      });
      
      // Add hover effect for devices with hover capability
      const hasHover = window.matchMedia('(hover: hover)').matches;
      if (hasHover) {
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-2px)';
            el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
          });
          
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          });
        });
      }
    }
    
    // Run mobile animations setup
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupMobileAnimations);
    } else {
      setupMobileAnimations();
    }
    
    // Scroll to target function using polyfill
    function scrollToTarget(hash) {
      if (!hash || hash === '#') {
        smoothScroll.scroll(window, 0, { speed: 500 });
        return;
      }
      
      const target = document.querySelector(hash);
      if (!target) return;
      
      // Close mobile menu if open
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle && navToggle.classList.remove('open');
      }
      
      // Calculate header offset
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : (window.innerWidth < 992 ? 80 : 100);
      
      // Get target position
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      // Use polyfill for smooth scrolling
      smoothScroll.scroll(window, targetPosition, {
        speed: 500,
        speedAsDuration: true,
        easing: 'easeInOutCubic'
      });
      
      // Update URL
      history.replaceState(null, null, hash);
    }
    
    // Handle all anchor clicks
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      
      e.preventDefault();
      scrollToTarget(hash);
    });
    
    // Handle initial page load with hash
    function handleInitialScroll() {
      if (window.location.hash) {
        // Small delay to ensure all elements are rendered
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToTarget(window.location.hash);
          });
        });
      }
    }
    
    // Initialize with multiple fallbacks
    function initializeScrolling() {
      console.log('Initializing scrolling...');
      
      // First try with a small delay
      setTimeout(() => {
        if (window.location.hash) {
          console.log('Initial scroll to hash:', window.location.hash);
          scrollToTarget(window.location.hash);
        }
      }, 100);
      
      // Additional check after fonts/images are loaded
      window.addEventListener('load', () => {
        console.log('Window loaded, checking hash...');
        if (window.location.hash) {
          setTimeout(() => {
            scrollToTarget(window.location.hash);
          }, 200);
        }
      });
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeScrolling);
    } else {
      initializeScrolling();
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
      if (window.location.hash) {
        scrollToTarget(window.location.hash);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    
    // Force scroll to top on page refresh
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
  
    // Form handler (enhanced)
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    const clearBtn = document.getElementById('clearBtn');
  
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        form.reset();
        formMsg.textContent = '';
        formMsg.style.color = '';
      });
    }
  
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Enhanced validation
        if (!name || !phone) {
          formMsg.style.color = '#dc2626';
          formMsg.textContent = 'Please enter your name and contact details.';
          return;
        }
        
        if (name.length < 2) {
          formMsg.style.color = '#dc2626';
          formMsg.textContent = 'Please enter a valid name (minimum 2 characters).';
          return;
        }
        
        if (phone.length < 5) {
          formMsg.style.color = '#dc2626';
          formMsg.textContent = 'Please enter a valid phone number or email address.';
          return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          formMsg.style.color = '#059669';
          formMsg.textContent = 'Thank you! Your enquiry has been received. Our team will contact you within 24 hours with a personalized solution.';
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1500);
      });
    }

    // Enhanced hero parallax effect
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        const parallaxSpeed = 0.5;
        const scaleSpeed = 0.0001;
        
        // Parallax movement
        heroBg.style.transform = `scale(${1.1 + (sc * scaleSpeed)}) translateY(${sc * parallaxSpeed}px)`;
      }, { passive: true });
    }

    // Add premium hover effects to service cards
    const serviceCards = document.querySelectorAll('.service');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });

    // Add premium hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.price-card');
    pricingCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
          this.style.transform = 'translateY(-4px)';
        }
      });
      card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
          this.style.transform = 'translateY(0)';
        }
      });
    });

    // Add smooth reveal animations for expertise items if AOS missing
    if (!(window.AOS && typeof AOS.init === 'function')) {
      const expertiseItems = document.querySelectorAll('.expertise-item');
      expertiseItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
    }
  });
  