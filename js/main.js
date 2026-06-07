/* ============================================================
   DIGITAL PORTFOLIO - JavaScript
   Student Portfolio for "Nhập môn Công nghệ số và Ứng dụng AI"
   ============================================================ */

// ============================================================
// DOM CONTENT LOADED
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNavbar();
  initSmoothScroll();
  initScrollAnimation();
  initSkillBars();
  initCounterAnimation();
  initNavbarScroll();
});

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.navbar-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu when window resizes to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// ACTIVE NAVBAR HIGHLIGHT
// ============================================================
function initActiveNavbar() {
  const navLinks = document.querySelectorAll('.navbar-menu a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    link.classList.remove('active');

    if (linkHref === currentPage) {
      link.classList.add('active');
    }

    // For index page, also match root path
    if ((currentPage === '' || currentPage === 'index.html') && (linkHref === 'index.html' || linkHref === './')) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight = 80; // Account for fixed navbar
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollAnimation() {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // If element has skill progress bars, animate them
        const skillProgress = entry.target.querySelectorAll('.skill-progress');
        if (skillProgress.length > 0) {
          skillProgress.forEach(bar => {
            bar.classList.add('animated');
          });
        }

        // Unobserve after animation to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger a bit earlier
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================================
// SKILL SECTION - ANIMATION
// ============================================================
function initSkillBars() {
  // This function is kept for compatibility - no progress bars needed
  // in the new design. The scroll reveal animation handles everything.
}

// ============================================================
// COUNTER ANIMATION FOR STATS
// ============================================================
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(stat => {
    // Get the original text content
    const originalText = stat.textContent.trim();
    // Try to parse as number
    const parsedNumber = parseInt(originalText.replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsedNumber)) return;

    // Save original text and numeric value
    stat.dataset.target = parsedNumber;
    stat.dataset.original = originalText;
    stat.textContent = '0';

    // If there's a % sign, track it
    if (originalText.includes('%')) {
      stat.dataset.suffix = '%';
    } else if (originalText.includes('+')) {
      stat.dataset.suffix = '+';
    } else {
      stat.dataset.suffix = '';
    }
  });

  // Observe stats section
  const statsGrid = document.querySelector('.stats-grid');
  if (!statsGrid || statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters(statNumbers);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsGrid);
}

/**
 * Animate counter from 0 to target value
 * @param {NodeList} elements - Stat elements to animate
 */
function animateCounters(elements) {
  elements.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000; // 2 seconds
    const step = Math.max(1, Math.floor(target / 60)); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = current + suffix;
        requestAnimationFrame(() => setTimeout(updateCounter, 16));
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
}

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ============================================================
// HELPER: PARALLAX EFFECT FOR HERO (Optional enhancement)
// ============================================================
// Uncomment if you want a subtle parallax on the hero
/*
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.05}px)`;
  }
});
*/

console.log('%c🎓 Digital Portfolio - Nhập môn Công nghệ số và Ứng dụng AI', 'color: #2563EB; font-size: 16px; font-weight: bold;');
console.log('%c👨‍💻 Developed with ❤️ by Computer Science Student', 'color: #06B6D4; font-size: 12px;');