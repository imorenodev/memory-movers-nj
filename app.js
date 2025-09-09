// Minimal JavaScript for Thomas Larson Group Real Estate Site

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navbar toggle functionality
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu li a');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Close mobile menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Add hover class for touch devices on cards
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Touch device support
    card.addEventListener('touchstart', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('touchend', function() {
      this.classList.remove('hover');
    });
    
    // Mouse events for desktop
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
  
  // Smooth scroll for internal anchors if any are added later
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add loading states for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', function() {
        this.style.transition = 'opacity 300ms ease';
        this.style.opacity = '1';
      });
    }
  });
  
  // Simple intersection observer for fade-in animations (optional enhancement)
  if ('IntersectionObserver' in window) {
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
    
    // Observe sections for subtle entrance animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 600ms ease, transform 600ms ease';
      observer.observe(section);
    });
  }
  
  // Form handling if contact forms are added later
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Basic form validation can be added here
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#e74c3c';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });
});