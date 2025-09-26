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
      // Don't close menu for dropdown toggles
      if (!this.classList.contains('dropdown-toggle')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Dropdown functionality
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdown = this.parentElement;
      const isActive = dropdown.classList.contains('active');
      
      // Close all other dropdowns
      dropdowns.forEach(d => d.classList.remove('active'));
      
      // Toggle current dropdown
      if (!isActive) {
        dropdown.classList.add('active');
      }
    });
  });

  // Close mobile menu and dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    // Close mobile menu
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Close dropdowns
    let clickedInsideDropdown = false;
    dropdowns.forEach(dropdown => {
      if (dropdown.contains(e.target)) {
        clickedInsideDropdown = true;
      }
    });
    
    if (!clickedInsideDropdown) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
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

/* ===== 5-STEP PLAN CAROUSEL (tabs + clicks + arrows + swipe) ============ */
(() => {
  const root = document.querySelector('#feature-split.plan-carousel');
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('.step-number'));
  const slides = Array.from(root.querySelectorAll('.slide'));
  const carousel = root.querySelector('.carousel');

  function activate(step) {
    const targetId = `step-${step}`;
    slides.forEach(s => s.classList.toggle('is-active', s.id === targetId));
    tabs.forEach(btn => {
      const isActive = btn.dataset.step === String(step);
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.tabIndex = isActive ? 0 : -1;
    });
  }

  // Click
  tabs.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.step)));

  // Keyboard (arrow keys on the active tab)
  tabs.forEach((btn, i) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next].dataset.step);
    });
  });

  // Basic swipe (pointer) on the image for mobile
  let startX = null;
  carousel.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  carousel.addEventListener('pointerup', (e) => {
    if (startX == null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) {
      const activeIndex = tabs.findIndex(b => b.classList.contains('is-active'));
      const nextIndex = dx < 0 ? (activeIndex + 1) % tabs.length : (activeIndex - 1 + tabs.length) % tabs.length;
      activate(tabs[nextIndex].dataset.step);
      tabs[nextIndex].focus();
    }
    startX = null;
  });

  // Ensure first state is correct on load
  activate(1);
})();