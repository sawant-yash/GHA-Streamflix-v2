// StreamFlix Premium V2 - Advanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('StreamFlix Premium V2 loaded successfully!');

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.querySelector('.search-container');
    const searchModal = document.getElementById('searchModal');
    const movieModal = document.getElementById('movieModal');
    const closeModal = document.getElementById('closeModal');
    const addToListBtn = document.getElementById('addToList');
    const muteBtn = document.getElementById('muteBtn');
    const categoryPills = document.querySelectorAll('.category-pill');
    const navLinks = document.querySelectorAll('.nav-link');

    // Movie Data
    const movieDescriptions = {
        1: "In a world where technology controls everything, one hacker must fight against a corrupt AI system to save humanity.",
        2: "Deep beneath the ocean lies a secret that could change the world. A team of scientists discovers something unexpected.",
        3: "Warriors from across the galaxy unite to defend the universe against an ancient threat.",
        4: "A touching story about love, loss, and the power of dance to heal the soul.",
        5: "Two strangers meet during a solar eclipse and discover a connection that transcends time.",
        6: "When a security system fails, an elite team must stop a catastrophic attack.",
        7: "A spy must navigate a web of deception to uncover a conspiracy at the highest levels.",
        8: "An adventure through uncharted wilderness leads to the discovery of a lifetime.",
        9: "In a world of virtual reality, one programmer discovers the line between real and digital is fading.",
        10: "A dysfunctional family reunites and discovers that love can overcome any obstacle.",
        11: "Something lurks beneath the surface of a peaceful lake, waiting to be awakened.",
        12: "The fastest racers compete in the ultimate championship where only one can survive."
    };

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            performSearch(query);
            searchModal.classList.add('active');
        } else {
            searchModal.classList.remove('active');
        }
    });

    function performSearch(query) {
        const allCards = document.querySelectorAll('.movie-card, .tv-card');
        const results = [];
        
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                results.push({
                    title: card.querySelector('h3').textContent,
                    genre: card.querySelector('p').textContent
                });
            }
        });

        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        if (results.length === 0) {
            searchResults.innerHTML = '<p style="color: var(--text-secondary); padding: 20px;">No results found</p>';
            return;
        }

        searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" style="padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: background 0.3s;">
                <h4 style="margin-bottom: 5px;">${item.title}</h4>
                <p style="color: var(--text-secondary); font-size: 13px;">${item.genre}</p>
            </div>
        `).join('');

        // Add hover effects
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'rgba(0, 229, 255, 0.1)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
            item.addEventListener('click', () => {
                alert('Playing: ' + item.querySelector('h4').textContent);
                searchModal.classList.remove('active');
                searchInput.value = '';
            });
        });
    }

    // Close search modal when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && !searchModal.contains(e.target)) {
            searchModal.classList.remove('active');
            searchContainer.classList.remove('active');
        }
    });

    // Category pills functionality
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Show filter animation
            const genre = this.textContent.trim().toLowerCase();
            filterByGenre(genre);
        });
    });

    function filterByGenre(genre) {
        const cards = document.querySelectorAll('.movie-card, .tv-card');
        cards.forEach(card => {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Navigation active state
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Carousel functionality
    const carousels = {
        'trending': { current: 0 },
        'newreleases': { current: 0 }
    };

    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const carouselName = this.dataset.carousel;
            const carousel = document.getElementById(carouselName + '-carousel');
            const cards = carousel.querySelectorAll('.movie-card');
            const cardWidth = cards[0].offsetWidth + 20;
            const maxScroll = (cards.length - 4) * cardWidth;
            
            if (this.classList.contains('next-btn')) {
                carousels[carouselName].current = Math.min(carousels[carouselName].current + cardWidth, maxScroll);
            } else {
                carousels[carouselName].current = Math.max(carousels[carouselName].current - cardWidth, 0);
            }
            
            carousel.style.transform = `translateX(-${carousels[carouselName].current}px)`;
        });
    });

    // Movie card click handler - Open modal
    document.querySelectorAll('.movie-card, .tv-card, .continue-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.play-btn')) {
                const title = this.querySelector('h3, h4').textContent;
                showPlayNotification(title);
                return;
            }
            
            const id = this.dataset.id;
            openMovieModal(this, id);
        });
    });

    function openMovieModal(card, id) {
        const title = card.querySelector('h3, h4').textContent;
        const genre = card.querySelector('p').textContent;
        const poster = card.querySelector('.card-poster, .tv-poster, .continue-poster');
        const gradient = poster.className.split(' ').find(c => c.startsWith('gradient-'));
        
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMeta').innerHTML = `
            <span><i class="fas fa-calendar"></i> 2024</span>
            <span><i class="fas fa-clock"></i> 2h 15m</span>
            <span><i class="fas fa-star" style="color: #ffd700;"></i> 4.7</span>
        `;
        document.getElementById('modalDescription').textContent = movieDescriptions[id] || 
            'An exciting story that will keep you on the edge of your seat. Premium entertainment awaits!';
        document.getElementById('modalPoster').className = 'modal-poster ' + gradient;
        document.getElementById('modalPoster').innerHTML = poster.querySelector('.card-icon').outerHTML;
        
        movieModal.classList.add('active');
    }

    // Close modal
    closeModal.addEventListener('click', function() {
        movieModal.classList.remove('active');
    });

    movieModal.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            movieModal.classList.remove('active');
        }
    });

    // Play buttons
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', function() {
            showPlayNotification('Featured Content');
        });
    });

    function showPlayNotification(title) {
        // Create notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="position: fixed; bottom: 30px; right: 30px; background: var(--primary-color); color: var(--bg-dark); padding: 20px 30px; border-radius: 10px; z-index: 3000; animation: slideIn 0.3s ease; font-weight: 600;">
                <i class="fas fa-play-circle" style="margin-right: 10px;"></i>
                Now Playing: ${title}
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add to list button
    let isInList = false;
    addToListBtn.addEventListener('click', function() {
        isInList = !isInList;
        this.innerHTML = isInList ? '<i class="fas fa-check"></i>' : '<i class="fas fa-plus"></i>';
        this.style.background = isInList ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)';
        this.style.color = isInList ? 'var(--bg-dark)' : 'var(--text-primary)';
        
        showToast(isInList ? 'Added to My List' : 'Removed from My List');
    });

    // Mute button
    let isMuted = false;
    muteBtn.addEventListener('click', function() {
        isMuted = !isMuted;
        this.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(0, 229, 255, 0.9); color: var(--bg-dark); padding: 15px 30px; border-radius: 8px; z-index: 3000; font-weight: 500;">
                ${message}
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    // Create floating particles in hero
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(0, 229, 255, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            movieModal.classList.remove('active');
            searchModal.classList.remove('active');
        }
        if (e.key === '/' && !searchContainer.classList.contains('active')) {
            e.preventDefault();
            searchContainer.classList.add('active');
            searchInput.focus();
        }
    });

    console.log('StreamFlix Premium V2 initialized with all features!');
});
