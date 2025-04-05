document.addEventListener('DOMContentLoaded', function () {
    const totalCards = 15;

    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
        if (window.innerWidth <= 480) {
            return 1;
        } else if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1023) {
            return 2;
        } else {
            return 3;
        }
    }

    const reviewTemplate = {
        stars: 5,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
        authorName: "Name Surname",
        authorPosition: "Position, Company name"
    };

    const slider = document.querySelector('.reviews-slider');
    const navContainer = document.querySelector('.reviews-navigation');

    for (let i = 0; i < totalCards; i++) {
        const card = createReviewCard(reviewTemplate);
        slider.appendChild(card);
    }

    let currentSlide = 0;
    let autoScrollInterval;
    let totalSlides;

    const prevBtn = document.querySelector('.prev-review');
    const nextBtn = document.querySelector('.next-review');

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    window.addEventListener('resize', function () {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            setupSliderAndNavigation();
            updateSlider(true);
        }
    });

    window.addEventListener('load', function () {
        setupSliderAndNavigation();
        startAutoScroll();
    });

    function setupSliderAndNavigation() {
        const reviewCards = document.querySelectorAll('.review-card');
        const sliderContainer = document.querySelector('.reviews-slider-container');
        const containerWidth = sliderContainer.offsetWidth;
        const cardWidth = (containerWidth / cardsPerView) - 20;

        reviewCards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });

        totalSlides = Math.ceil(totalCards / cardsPerView);

        navContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            navContainer.appendChild(dot);
        }

        if (currentSlide >= totalSlides) {
            currentSlide = totalSlides - 1;
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoScroll();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetAutoScroll();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoScroll();
    }

    function updateSlider(skipAnimation = false) {
        // Update active dot
        document.querySelectorAll('.nav-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });

        // Get card width for calculation
        const reviewCard = document.querySelector('.review-card');
        if (!reviewCard) return;

        const totalCardWidth = reviewCard.offsetWidth + 20;
        const offset = -currentSlide * (totalCardWidth * cardsPerView);

        if (skipAnimation) {
            slider.style.transition = 'none';
            requestAnimationFrame(() => {
                slider.style.transform = `translateX(${offset}px)`;
                requestAnimationFrame(() => {
                    slider.style.transition = 'transform 0.5s ease';
                });
            });
        } else {
            slider.style.transform = `translateX(${offset}px)`;
            slider.style.transition = 'transform 0.5s ease';
        }
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 7000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Function to create review cards
    function createReviewCard(data) {
        const card = document.createElement('div');
        card.classList.add('review-card');

        const starsHtml = `<div class="stars">${'<div class="star">★</div>'.repeat(data.stars)}</div>`;
        const textHtml = `<p class="review-text">"${data.text}"</p>`;
        const authorHtml = `
            <div class="review-author">
                <div class="author-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="author-info">
                    <p class="author-name">${data.authorName}</p>
                    <p class="author-position">${data.authorPosition}</p>
                </div>
            </div>
        `;

        card.innerHTML = starsHtml + textHtml + authorHtml;
        return card;
    }
});

// FAQs Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav');

if (hamburger) {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Search toggle functionality
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.querySelector('.search-bar');
const navLinks = document.querySelector('.nav');

if (searchToggle) {
    searchToggle.addEventListener('click', function () {
        searchBar.classList.toggle('active');
        navLinks.classList.toggle('hidden');

        // Focus the input when search is active
        if (searchBar.classList.contains('active')) {
            searchBar.querySelector('input').focus();
        }
    });
}

// Close menu and search when clicking outside
document.addEventListener('click', function (event) {
    // Close menu
    if (hamburger && nav.classList.contains('active') &&
        !event.target.closest('.nav') &&
        !event.target.closest('.hamburger-menu')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }

    // Close search
    if (searchToggle && searchBar.classList.contains('active') &&
        !event.target.closest('.search-bar') &&
        !event.target.closest('#search-toggle')) {
        searchBar.classList.remove('active');
        navLinks.classList.remove('hidden');
    }
});

// Handle escape key press
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        // Close search if open
        if (searchBar && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            navLinks.classList.remove('hidden');
        }

        // Close menu if open
        if (nav && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate counting up
function countUp(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1000;
    const startTime = performance.now();
    let animationFrameId;

    function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        
        const currentCount = Math.floor(easedProgress * target);
        element.textContent = currentCount + '%';
        
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '%';
        }
    }
    
    animationFrameId = requestAnimationFrame(updateCount);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const percentageElements = entry.target.querySelectorAll('.stat-percentage');
            percentageElements.forEach(element => {
                countUp(element);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.2 });

observer.observe(document.querySelector('.stats-container'));

let hasAnimated = false;
function checkScroll() {
    if (hasAnimated) return;
    
    const statsContainer = document.querySelector('.stats-container');
    if (isInViewport(statsContainer)) {
        const percentageElements = document.querySelectorAll('.stat-percentage');
        percentageElements.forEach(element => {
            countUp(element);
        });
        hasAnimated = true;
        window.removeEventListener('scroll', checkScroll);
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);
