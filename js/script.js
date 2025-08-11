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
  
    // nav toggle
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  
    // Smooth scroll for anchor links with enhanced mobile support
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          const offset = 70;
          const headerOffset = window.innerWidth < 992 ? 60 : 70; // Smaller offset for mobile
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Close mobile nav if open
          if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            navToggle && navToggle.classList.remove('open');
          }
          
          // Smooth scroll to target
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without adding to history
          if (history.pushState) {
            history.pushState(null, null, href);
          } else {
            location.hash = href;
          }
        }
      });
    });
  
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
  