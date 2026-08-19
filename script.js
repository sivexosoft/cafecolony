// ============================================
// JS: script.js
// Cafe Colony - Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- NAVIGATION ----------
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        const isOpen = navList.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Sticky navbar
    let lastScrollY = 0;
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ---------- MENU DATA ----------
    // This data structure makes menu items easy to edit.
    // Replace placeholder items with verified Cafe Colony menu items.
    const menuItems = [
        // Breakfast
        {
            id: 1,
            name: '[Breakfast Item 1]',
            category: 'breakfast',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        {
            id: 2,
            name: '[Breakfast Item 2]',
            category: 'breakfast',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        // Main Course
        {
            id: 3,
            name: '[Main Course Item 1]',
            category: 'main',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        {
            id: 4,
            name: '[Main Course Item 2]',
            category: 'main',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        // Burgers
        {
            id: 5,
            name: '[Burger Item 1]',
            category: 'burgers',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        {
            id: 6,
            name: '[Burger Item 2]',
            category: 'burgers',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        // Beverages
        {
            id: 7,
            name: '[Beverage 1]',
            category: 'beverages',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        },
        {
            id: 8,
            name: '[Beverage 2]',
            category: 'beverages',
            description: '[Short description]',
            price: '[PRICE]',
            image: 'images/menu-placeholder.jpg'
        }
    ];

    // ---------- RENDER MENU ----------
    const menuGrid = document.getElementById('menuGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderMenu(category = 'all') {
        const filtered = category === 'all' ?
            menuItems :
            menuItems.filter(item => item.category === category);

        if (filtered.length === 0) {
            menuGrid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:40px; color:#6B6760;">
                    <p>No menu items available for this category yet.</p>
                    <p style="font-size:0.9rem;">Please check back soon!</p>
                </div>
            `;
            return;
        }

        menuGrid.innerHTML = filtered.map(item => `
            <div class="menu-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-item-content">
                    <span class="menu-item-category">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="menu-item-price">${item.price}</span>
                </div>
            </div>
        `).join('');
    }

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            renderMenu(category);
        });
    });

    // Initial render
    renderMenu('all');

    // ---------- GALLERY LIGHTBOX ----------
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentImageIndex = 0;
    let galleryImages = [];

    // Collect gallery image sources
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);
            item.addEventListener('click', function() {
                const src = this.querySelector('img').src;
                const index = galleryImages.indexOf(src);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        }
    });

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = galleryImages[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // ---------- SCROLL REVEAL (IntersectionObserver) ----------
    const revealElements = document.querySelectorAll(
        '.about-container, .signature-grid, .menu-grid, .gallery-grid, .reviews-grid, .location-container, .contact-cta-container'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add a small class to trigger the reveal
    document.addEventListener('scroll', function() {
        revealElements.forEach(el => {
            if (el.classList.contains('revealed')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // Force reveal if already visible on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('revealed');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 200);

    console.log('Cafe Colony website initialized successfully.');
    console.log('Replace placeholder text and images with verified business information.');
    console.log('Facebook page: https://www.facebook.com/p/Cafe-Colony-61578454317347/');
});
