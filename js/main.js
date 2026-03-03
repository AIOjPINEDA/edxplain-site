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

    /* ── References toggle (show more / show less) ── */
    function initRefToggle() {
        const toggle = document.querySelector('.ref-toggle');
        const extra = document.querySelector('.ref-list-extra');

        if (!toggle || !extra) return;

        toggle.addEventListener('click', () => {
            const expanded = extra.classList.toggle('show');
            toggle.setAttribute('aria-expanded', expanded);
            toggle.textContent = expanded
                ? 'Show fewer references \u25B2'
                : 'Show 4 more references \u25BC';
        });
    }

    /* ── Init all ── */
    function init() {
        initScrollAnimations();
        initMobileNav();
        initRefToggle();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
