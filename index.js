document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       1. Mobile Navigation Menu Toggle
       ========================================================================== */
    const menuToggle = document.getElementById("menu-toggle");
    const mainNavigation = document.getElementById("main-navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            mainNavigation.classList.toggle("open");
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("open");
                mainNavigation.classList.remove("open");
            });
        });
    }

    /* ==========================================================================
       2. Sticky Header Background Change
       ========================================================================== */
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ==========================================================================
       3. Dynamic Typing Effect (Hero Section)
       ========================================================================== */
    const typingText = document.getElementById("typing-text");
    const words = ["Seismic Design","Attenuation Models", "Structural Health Monitoring", "Sustainable Environments",];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Erase faster
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word is completely typed out, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) {
        type();
    }

    /* ==========================================================================
       4. HTML5 Canvas Interactive Particle Network
       ========================================================================== */
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const connectionDistance = 105;
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    // Particle Class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.baseColor = "rgba(99, 102, 241, 0.4)"; // Indigo tint
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse proximity behavior (soft push)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.hypot(dx, dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    // Move away slightly
                    this.x -= Math.cos(angle) * force * 0.8;
                    this.y -= Math.sin(angle) * force * 0.8;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor;
            ctx.fill();
        }
    }

    // Initialize particles array
    function initParticles() {
        particles = [];
        // Scale number of particles based on window width (max 90 for performance)
        const density = Math.min(Math.floor(window.innerWidth / 15), 90);
        for (let i = 0; i < density; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    // Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby nodes
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);

                if (distance < connectionDistance) {
                    // Compute gradient alpha based on distance
                    const alpha = (1 - distance / connectionDistance) * 0.18;
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw connections to mouse
        if (mouse.x !== null && mouse.y !== null) {
            for (let i = 0; i < particles.length; i++) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const distance = Math.hypot(dx, dy);

                if (distance < mouse.radius) {
                    const alpha = (1 - distance / mouse.radius) * 0.15;
                    ctx.strokeStyle = `rgba(217, 70, 239, ${alpha})`; // Pink tint
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    // Event listeners for particles canvas
    window.addEventListener("resize", resizeCanvas);
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Start particles canvas
    if (canvas) {
        resizeCanvas();
        animateParticles();
    }

    /* ==========================================================================
       5. Scroll Reveal Effect (Observer API)
       ========================================================================== */
    const revealElements = document.querySelectorAll(".section, .glass-card, .timeline-item");
    
    revealElements.forEach(el => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once animated
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       6. Active Navigation Link Tracker on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    
    const navObserverOptions = {
        root: null,
        rootMargin: "-25% 0px -60% 0px", // Focus on middle segment of screen
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href === `#${activeId}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    /* ==========================================================================
       7. Projects Filter Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const projectsGrid = document.getElementById("projects-grid");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all buttons and add to clicked
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (filterValue === "all" || cardCategory === filterValue) {
                    // Show item
                    card.classList.remove("hidden");
                    // Force redraw for animation triggers
                    void card.offsetWidth;
                    card.classList.remove("fade-out");
                    card.classList.add("fade-in");
                } else {
                    // Hide item
                    card.classList.remove("fade-in");
                    card.classList.add("fade-out");
                    
                    // Delay hiding from display grid until fade out completes
                    setTimeout(() => {
                        if (card.classList.contains("fade-out")) {
                            card.classList.add("hidden");
                        }
                    }, 400);
                }
            });
        });
    });

    /* ==========================================================================
       8. Form Validation & Web3Forms Contact Submission
       ========================================================================== */
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("form-submit-btn");
    const toast = document.getElementById("toast");

    function showToast(message, type = "success") {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Guard: check if placeholder key is still in place
            const accessKeyInput = contactForm.querySelector('input[name="access_key"]');
            if (accessKeyInput && accessKeyInput.value === "YOUR_ACCESS_KEY_HERE") {
                showToast("Please configure your Web3Forms Access Key in index.html first!", "error");
                return;
            }

            // Disable submit button during fetch
            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `Sending... <span class="spinner"></span>`;

            // Prepare form data
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // POST to Web3Forms API
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status === 200) {
                    showToast("Message sent successfully! I will get back to you soon.", "success");
                    contactForm.reset();
                } else {
                    console.error("API Response error: ", res);
                    showToast(res.message || "Something went wrong. Please try again.", "error");
                }
            })
            .catch((error) => {
                console.error("Form transmission error: ", error);
                showToast("Failed to send message. Please check your internet connection.", "error");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            });
        });
    }
});
