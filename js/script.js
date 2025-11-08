// Smooth scroll
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Update URL hash without page reload
    history.pushState(null, null, `#${id}`);
  }
  closeMobileMenu();
}

// Typewriter - ONLY RUN ON HOMEPAGE
function initTypewriter() {
  const typewriterEl = document.querySelector('.hero-typewriter');
  if (!typewriterEl) {
    console.log('No hero section found (photography page)');
    return; // Exit if no hero section (photography page)
  }

  const words = ['Full-Stack Developer', 'Photographer', 'UI/UX Enthusiast'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  
  function typeWriter() {
    const current = words[wordIndex];
    typewriterEl.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
    if (!isDeleting && charIndex === current.length) setTimeout(() => isDeleting = true, 1500);
    if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
  }
  
  typeWriter();
}

// Hero slideshow - ONLY RUN ON HOMEPAGE
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return; // Exit if no hero slides (photography page)
  
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// Tabs
function showTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Photo filter
function filterPhotos(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.photo-card').forEach(card => {
    card.style.display = (category === 'all' || card.classList.contains(category)) ? 'block' : 'none';
  });
}

// ========================================
// DARK MODE WITH PERSISTENCE
// ========================================

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  
  // Save preference to localStorage
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  
  // Update icons
  const icons = document.querySelectorAll('.theme-toggle i');
  icons.forEach(icon => {
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
}

// Load dark mode preference on page load
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode');
  
  if (darkMode === 'true') {
    document.body.classList.add('dark');
    // Update icons to sun (since dark mode is active)
    const icons = document.querySelectorAll('.theme-toggle i');
    icons.forEach(icon => {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    });
  }
}

// ========================================
// MOBILE MENU
// ========================================

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.toggle('active');
  
  const mobileMenu = document.getElementById('mobileMenu');
  const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
  mobileMenu.setAttribute('aria-expanded', !isExpanded);
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  mobileNav.classList.remove('active');
  
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.setAttribute('aria-expanded', 'false');
}

// Close on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const mobileNav = document.getElementById('mobileNav');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileNav.classList.contains('active') && 
      !mobileNav.contains(e.target) && 
      !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

// ========================================
// NAVIGATION HANDLERS
// ========================================

function handleLogoClick() {
  if (window.location.pathname.includes('photography.html')) {
    // On photography page, go to homepage
    window.location.href = 'index.html';
  } else {
    // On homepage, scroll to top
    scrollToSection('home');
  }
}

function handleNavClick(section) {
  if (window.location.pathname.includes('photography.html')) {
    // On photography page
    if (section === 'photography') {
      // Already on photography page, do nothing or scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'home') {
      // Go to homepage
      window.location.href = 'index.html';
    } else {
      // For other sections, go to homepage and scroll to section
      window.location.href = `index.html#${section}`;
    }
  } else {
    // On homepage, use smooth scroll
    scrollToSection(section);
  }
  closeMobileMenu();
}

// ========================================
// SIMPLE LIGHTBOX SYSTEM
// ========================================

function openLightbox(photoCard) {
  console.log('Opening lightbox...');
  
  const imageSrc = photoCard.getAttribute('data-image');
  const imageAlt = photoCard.getAttribute('data-alt');
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  
  if (!lightbox || !lightboxImg) {
    console.error('Lightbox elements not found!');
    return;
  }
  
  lightboxImg.src = imageSrc;
  lightboxImg.alt = imageAlt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  console.log('Lightbox opened with image:', imageSrc);
}

function closeLightbox() {
  console.log('Closing lightbox...');
  
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close lightbox on click outside or escape key
document.addEventListener('click', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('active')) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  }
});

document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox && lightbox.classList.contains('active') && e.key === 'Escape') {
    closeLightbox();
  }
});

// ========================================
// PHOTO PROTECTION
// ========================================

function protectPhotos() {
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      alert('Photos are protected from downloading');
      return false;
    }
  });
  
  // Disable drag
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
}

// ========================================
// DYNAMIC NAVBAR
// ========================================

function handleNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// ========================================
// PHOTOGRAPHY PAGE SPECIFIC
// ========================================

function initPhotographyPage() {
  console.log('Initializing photography page...');
  
  // Add photography page class to body
  document.body.classList.add('photography-page');
  
  // Force header to be visible and remove scroll listener
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('scrolled');
  }
  window.removeEventListener('scroll', handleNavbarScroll);
  
  // Add click events to all photo cards
  const photoCards = document.querySelectorAll('.photo-grid-full .photo-card');
  console.log('Found photo cards for lightbox:', photoCards.length);
  
  photoCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      openLightbox(this);
    });
  });
  
  // Enable photo protection
  protectPhotos();
}

// ========================================
// HOMEPAGE SPECIFIC
// ========================================

function initHomepage() {
  console.log('Initializing homepage...');
  
  // Disable lightbox for homepage gallery
  const homePhotos = document.querySelectorAll('#photography .photo-card');
  homePhotos.forEach(card => {
    card.style.cursor = 'default';
  });
}

// ========================================
// URL HASH HANDLING
// ========================================

// Handle URL hash navigation
function handleUrlHash() {
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio initialized');
  
  // Load dark mode preference first
  loadDarkModePreference();
  
  // Handle URL hash on page load
  handleUrlHash();
  
  // Initialize navbar scroll (only for homepage)
  if (!window.location.pathname.includes('photography.html')) {
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);
  }
  
  // Check which page we're on and initialize accordingly
  const isPhotographyPage = window.location.pathname.includes('photography.html');
  
  if (isPhotographyPage) {
    console.log('This is the photography page');
    initPhotographyPage();
  } else {
    console.log('This is the homepage');
    initHomepage();
    initTypewriter();
    initHeroSlideshow();
  }
});