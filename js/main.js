/* ═══════════════════════════════════════════════
   EDxPlain Landing Page — Scripts
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Scroll fade-in animation ── */
    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    }

    /* ── Counter animation (numbers increment on scroll) ── */
    function initCounters() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const el = entry.target;
                    const target = +el.dataset.target;
                    const duration = 1500;
                    const start = performance.now();

                    function update(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                        el.textContent = Math.round(target * eased);
                        if (progress < 1) requestAnimationFrame(update);
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.counter').forEach((el) => observer.observe(el));
    }

    /* ── Mobile nav toggle ── */
    function initMobileNav() {
        const hamburger = document.querySelector('.nav-ham');
        const navLinks = document.querySelector('.nav-links');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    /* ── Init all ── */
    function init() {
        initScrollAnimations();
        initCounters();
        initMobileNav();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
