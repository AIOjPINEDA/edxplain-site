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

    /* ── Output examples accordion ── */
    function initOutputExamples() {
        document.querySelectorAll('.ex-header[data-toggle]').forEach(function (header) {
            header.addEventListener('click', function () {
                var targetId = header.getAttribute('data-toggle');
                var body = document.getElementById(targetId);
                if (!body) return;

                var isOpen = body.classList.contains('open');

                // Close all panels first
                document.querySelectorAll('.ex-body.open').forEach(function (el) {
                    el.classList.remove('open');
                });
                document.querySelectorAll('.ex-header.active').forEach(function (el) {
                    el.classList.remove('active');
                });

                // Toggle current if it was closed
                if (!isOpen) {
                    body.classList.add('open');
                    header.classList.add('active');
                }
            });
        });
    }

    /* ── Init all ── */
    function init() {
        initScrollAnimations();
        initMobileNav();
        initRefToggle();
        initOutputExamples();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
