document.addEventListener('DOMContentLoaded', function () {

    /* -------------------------------------------------------------------------- */
    /*                               Contact Sidebar                              */
    /* -------------------------------------------------------------------------- */

    window.toggleContactSidebar = function () {
        const sidebar = document.getElementById('contactSidebar');
        const overlay = document.querySelector('.contact-sidebar-overlay');
        const body = document.body;

        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        body.classList.toggle('no-scroll');
    };

    /* -------------------------------------------------------------------------- */
    /*                               Scroll Animations                            */
    /* -------------------------------------------------------------------------- */

    // Smooth Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all scroll animate elements
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade');
    animateElements.forEach(el => observer.observe(el));


    /* -------------------------------------------------------------------------- */
    /*                             Lenis Smooth Scroll                            */
    /* -------------------------------------------------------------------------- */

    // Initialize Lenis
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Connect anchor links to Lenis
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    lenis.scrollTo(target, {
                        offset: -navHeight,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                }
            });
        });
    } else {
        // Fallback smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Navbar Scroll Effect                          */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                              Navbar Scroll Effect                          */
    /* -------------------------------------------------------------------------- */

    const navbar = document.querySelector('.navbar');

    // Check initial position
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                               Form Handling                                */
    /* -------------------------------------------------------------------------- */

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Mock submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    });
});
