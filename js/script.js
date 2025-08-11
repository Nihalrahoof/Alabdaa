// INIT
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  
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
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          const offset = 70;
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // close mobile nav
          if (nav.classList.contains('open')) nav.classList.remove('open');
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

        // optionally send to backend via fetch:
        // fetch('/api/enquiry', {
        //   method:'POST', 
        //   headers:{'Content-Type':'application/json'}, 
        //   body: JSON.stringify({name,phone,subject,message})
        // })
        // .then(response => response.json())
        // .then(data => {
        //   formMsg.style.color = '#059669';
        //   formMsg.textContent = 'Thank you! Your enquiry has been received.';
        //   form.reset();
        // })
        // .catch(error => {
        //   formMsg.style.color = '#dc2626';
        //   formMsg.textContent = 'Sorry, there was an error. Please try again.';
        // });
      });
    }

    // Enhanced hero scale effect
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      window.addEventListener('scroll', () => {
        const sc = window.scrollY;
        heroBg.style.transform = `scale(${1 + Math.min(sc / 6000, 0.06)}) translateY(${sc / 12}px)`;
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

    // Add smooth reveal animations for expertise items
    const expertiseItems = document.querySelectorAll('.expertise-item');
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

    expertiseItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(item);
    });

    // Add counter animation for hero stats
    const counters = document.querySelectorAll('.card strong');
    const animateCounters = () => {
      counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isNumber = /\d+/.test(target);
        
        if (isNumber && !isPercentage) {
          const finalNumber = parseInt(target.replace(/\D/g, ''));
          let currentNumber = 0;
          const increment = finalNumber / 50;
          
          const updateCounter = () => {
            if (currentNumber < finalNumber) {
              currentNumber += increment;
              counter.textContent = Math.floor(currentNumber) + (target.includes('+') ? '+' : '');
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
        }
      });
    };

    // Trigger counter animation when hero section is in view
    const heroSection = document.querySelector('.hero-section');
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 1000);
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    if (heroSection) {
      heroObserver.observe(heroSection);
    }
  });
  