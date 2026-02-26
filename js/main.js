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

    /* ── Chart.js defaults ── */
    function getChartDefaults() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: { family: 'Inter', size: 12, weight: '500' },
                        padding: 16,
                        usePointStyle: true,
                    },
                },
            },
        };
    }

    /* ── Comprehension gap chart (bar) ── */
    function initComprehensionChart() {
        const ctx = document.getElementById('chartComp');
        if (!ctx) return;

        const defaults = getChartDefaults();

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Diagnosis', 'Medications', 'Home Care', 'Red Flags', 'Follow-up'],
                datasets: [
                    {
                        label: 'Standard Discharge Note',
                        data: [22, 15, 18, 12, 25],
                        backgroundColor: 'rgba(239,68,68,0.7)',
                        borderColor: 'rgba(239,68,68,1)',
                        borderWidth: 1,
                        borderRadius: 6,
                    },
                    {
                        label: 'EDxPlain Output',
                        data: [85, 90, 88, 82, 92],
                        backgroundColor: 'rgba(0,200,150,0.7)',
                        borderColor: 'rgba(0,200,150,1)',
                        borderWidth: 1,
                        borderRadius: 6,
                    },
                ],
            },
            options: {
                ...defaults,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: (v) => v + '%',
                            font: { family: 'Inter', size: 11 },
                        },
                        grid: { color: 'rgba(0,0,0,0.04)' },
                    },
                    x: {
                        ticks: { font: { family: 'Inter', size: 11 } },
                        grid: { display: false },
                    },
                },
                plugins: {
                    ...defaults.plugins,
                    tooltip: {
                        callbacks: {
                            label: (ctx) =>
                                ctx.dataset.label + ': ' + ctx.parsed.y + '% comprehension',
                        },
                    },
                },
            },
        });
    }

    /* ── Safety validation chart (doughnut) ── */
    function initSafetyChart() {
        const ctx = document.getElementById('chartSafety');
        if (!ctx) return;

        const defaults = getChartDefaults();

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Closed-Context (prevents)',
                    'Coverage Judge',
                    'Fidelity Judge',
                    'Critical Values Judge',
                    'Clinician Review',
                ],
                datasets: [
                    {
                        data: [40, 15, 15, 20, 10],
                        backgroundColor: [
                            'rgba(15,111,255,0.8)',
                            'rgba(0,200,150,0.8)',
                            'rgba(79,70,229,0.8)',
                            'rgba(245,158,11,0.8)',
                            'rgba(239,68,68,0.8)',
                        ],
                        borderWidth: 2,
                        borderColor: '#fff',
                    },
                ],
            },
            options: {
                ...defaults,
                cutout: '55%',
                plugins: {
                    ...defaults.plugins,
                    tooltip: {
                        callbacks: {
                            label: (ctx) =>
                                ctx.label + ': ' + ctx.parsed + '% of error prevention',
                        },
                    },
                },
            },
        });
    }

    /* ── Market growth chart (line) ── */
    function initMarketChart() {
        const ctx = document.getElementById('chartMarket');
        if (!ctx) return;

        const defaults = getChartDefaults();

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    {
                        label: 'Patient Engagement Solutions ($B)',
                        data: [19.4, 23.1, 27.5, 32.7, 38.9, 46.3, 55.1, 65.5, 77.9],
                        borderColor: 'rgba(15,111,255,1)',
                        backgroundColor: 'rgba(15,111,255,0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2.5,
                        pointRadius: 4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: 'rgba(15,111,255,1)',
                        pointBorderWidth: 2,
                    },
                ],
            },
            options: {
                ...defaults,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (v) => '$' + v + 'B',
                            font: { family: 'Inter', size: 11 },
                        },
                        grid: { color: 'rgba(0,0,0,0.04)' },
                    },
                    x: {
                        ticks: { font: { family: 'Inter', size: 11 } },
                        grid: { display: false },
                    },
                },
            },
        });
    }

    /* ── Init all ── */
    function init() {
        initScrollAnimations();
        initCounters();
        initMobileNav();
        initComprehensionChart();
        initSafetyChart();
        initMarketChart();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
