










    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
      } else {
        themeIcon.className = 'fas fa-sun';
      }
    }

    // Custom cursor
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    const dotSpeed = 0.2;      // dot follows slower
    const outlineSpeed = 0.1;  // outer circle follows faster

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      // smooth follow for dot
      dotX += (mouseX - dotX) * dotSpeed;
      dotY += (mouseY - dotY) * dotSpeed;

      // smooth follow for circle
      outlineX += (mouseX - outlineX) * outlineSpeed;
      outlineY += (mouseY - outlineY) * outlineSpeed;

      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';

      requestAnimationFrame(animate);
    }

    animate();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  
    // Skills animation
    const skills = document.querySelectorAll(".skill");

    const animateCircles = () => {
      skills.forEach(skill => {
        const percent = skill.getAttribute("data-percent");
        const color = skill.getAttribute("data-color");
        const circle = skill.querySelector(".circle-progress");
        const text = skill.querySelector(".circle-text");

        const radius = 45;
        const circumference = 2 * Math.PI * radius;

        circle.style.stroke = color;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        let current = 0;
        const step = () => {
          current++;
          if (current <= percent) {
            const offset = circumference - (current / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            text.textContent = current + "%";
            requestAnimationFrame(step);
          }
        };
        step();
      });
    };

    // Trigger animation when visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCircles();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector(".services-skills"));

    // Portfolio filter functionality
   const buttons = document.querySelectorAll(".filter-buttons button");
    const cards = document.querySelectorAll(".card");

    // Function to filter cards
    function filterCards(category) {
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    }

    // Initialize - show all cards
    filterCards("all");

    // Add click event to filter buttons
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        // Update active button
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        // First fade out all cards
        gsap.to(cards, {
          duration: 0.3,
          opacity: 0,
          y: 50,
          stagger: 0.05,
          onComplete: function() {
            // Filter the cards
            filterCards(filter);

            // Get all cards that should be visible
            const visibleCards = Array.from(cards).filter(card => {
              const cardCategory = card.getAttribute("data-category");
              return filter === "all" || cardCategory === filter;
            });

            // Animate only the visible cards back in
            if (visibleCards.length > 0) {
              gsap.to(visibleCards, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1
              });
            }
          }
        });
      });
    });

    // Add click event to view buttons
    document.querySelectorAll('.view-btn').forEach(button => {
      button.addEventListener('click', function() {
        const cardTitle = this.closest('.card').querySelector('h3').textContent;
        alert(`Opening project: ${cardTitle}`);
      });
    });