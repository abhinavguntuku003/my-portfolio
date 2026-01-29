// Typing Animation
const typingContainer = document.getElementById("typing");
const subtitles = [
  "Machine Learning Enthusiast",
  "Full Stack Developer",
  "Problem Solver",
  "Tech Explorer"
];
let typingIdx = 0, deleting = false, textIdx = 0;

function typeSubtitle() {
  const currentText = subtitles[textIdx];
  typingContainer.textContent = currentText.slice(0, typingIdx) + "|";

  if (!deleting && typingIdx < currentText.length) {
    typingIdx++;
    setTimeout(typeSubtitle, 100);
  } else if (deleting && typingIdx > 0) {
    typingIdx--;
    setTimeout(typeSubtitle, 50);
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(typeSubtitle, 2000);
    } else {
      deleting = false;
      textIdx = (textIdx + 1) % subtitles.length;
      setTimeout(typeSubtitle, 500);
    }
  }
}
typeSubtitle();

// Loader fade out
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 400);
  }, 800);
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Dark Mode Toggle with persistence
const darkToggle = document.getElementById("darkToggle");

// Check system preference first
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem("theme");

// Set initial theme (default to dark mode)
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  darkToggle.checked = true;
} else if (!savedTheme && !prefersDark) {
  // If no saved preference and system prefers light
  document.body.classList.add("light-mode");
  darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
  
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// Active Link Indicator
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-right a:not(.dark-switch)");

  function setActiveLink() {
    let scrollY = window.scrollY;

    if (scrollY < 100) {
      navLinks.forEach(link => link.classList.remove("active"));
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-right a[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }
  
  window.addEventListener("scroll", setActiveLink);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close mobile menu when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Projects data
const newProjects = [
  {
    title: "Deep Learning Cancer Detection",
    category: "Machine Learning",
    description: "Developed a CNN model to detect cancerous cells from blood cell images with 95% accuracy. Implemented using TensorFlow and Python with comprehensive data preprocessing and augmentation techniques.",
    tags: ["Python", "TensorFlow", "CNN", "Medical AI"],
    image: "ima/projects-img",
    live: "#",
    repo: "#"
  },
  {
    title: "E-Commerce Platform",
    category: "Full Stack Development",
    description: "A modern e-commerce solution with seamless checkout experience, real-time inventory management, and secure payment integration using Stripe API.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "ima/projects-img",
    live: "#",
    repo: "#"
  },
  {
    title: "Real-Time Chat Application",
    category: "Web Development",
    description: "Built a real-time chat application with WebSocket integration, featuring user authentication, group chats, and message encryption for enhanced security.",
    tags: ["React", "Socket.io", "Express", "JWT"],
    image: "ima/projects-img",
    live: "#",
    repo: "#"
  },
  {
    title: "Data Visualization Dashboard",
    category: "Data Analytics",
    description: "Interactive dashboard for real-time business metrics with customizable reporting features and advanced data filtering capabilities.",
    tags: ["D3.js", "Python", "PostgreSQL", "Flask"],
    image: "ima/projects-img",
    live: "#",
    repo: "#"
  }
];

const newProjectsGridDiv = document.getElementById("newProjectsGrid");

// Create project card HTML
function createNewProjectCard(project) {
  return `
    <div class="new-project-card">
      <div class="new-project-image">
        ${project.image ? 
          `<img src="${project.image}" alt="${project.title}">` : 
          `<div class="new-project-image-placeholder">${project.title.charAt(0)}</div>`
        }
      </div>
      <div class="new-project-content">
        <div class="new-project-category">${project.category}</div>
        <h3 class="new-project-title">${project.title}</h3>
        <p class="new-project-description">${project.description}</p>
        <div class="new-project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="new-project-links">
          <a href="${project.live}" target="_blank" class="new-project-btn live-btn">
            <i class="fas fa-external-link-alt"></i> Live Demo
          </a>
          <a href="${project.repo}" target="_blank" class="new-project-btn code-btn">
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </div>
    </div>
  `;
}

// Initialize projects
function initNewProjects() {
  newProjectsGridDiv.innerHTML = newProjects.map(project => createNewProjectCard(project)).join('');
  
  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.new-project-card').forEach(card => {
      card.classList.add('animate');
    });
  }, 100);
}

// Initial render
initNewProjects();

// Smooth scroll for "Let's Talk" button
document.querySelector('.scroll-to-contact')?.addEventListener('click', () => {
  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Contact form submission
document.getElementById('contactForm').onsubmit = (e) => {
  e.preventDefault();
  
  // Get form values
  const formData = new FormData(e.target);
  const name = e.target.querySelector('input[type="text"]').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const message = e.target.querySelector('textarea').value;
  
  // Show success message
  const submitBtn = e.target.querySelector('.submit-btn');
  const originalContent = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
  submitBtn.style.background = '#10b981';
  
  // Reset form
  e.target.reset();
  
  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalContent;
    submitBtn.style.background = '';
  }, 3000);
  
  // Here you would typically send the data to a backend
  console.log('Form submitted:', { name, email, message });
};

// Initialize AOS animations
AOS.init({ 
  duration: 1000, 
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                          (element.textContent.includes('%') ? '%' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') +
                           (element.textContent.includes('%') ? '%' : '');
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (number) {
          stat.textContent = '0' + text.replace(/\d+/g, '');
          animateCounter(stat, number);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// Add cursor effect (optional enhancement)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = "auto";
  }
});

console.log('Portfolio loaded successfully! 🚀');
