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
  // Carousel functionality
  const mainImage = document.querySelector('.main-image img');
  const thumbnails = document.querySelectorAll('.thumbnail-gallery .thumbnail img');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.arrow-btn.prev');
  const nextBtn = document.querySelector('.arrow-btn.next');
  
  // Keep track of the current slide index
  let currentSlide = 0;
  const totalSlides = thumbnails.length;
  
  // Store all original image sources for reference
  const imageSources = Array.from(thumbnails).map(img => img.src);
  const mainImageSrc = mainImage.src;
  
  // Function to update the carousel state
  function updateCarousel(newIndex) {
      // Update current slide index
      currentSlide = newIndex;
      
      // Handle wrapping around when reaching the ends
      if (currentSlide < 0) currentSlide = totalSlides - 1;
      if (currentSlide >= totalSlides) currentSlide = 0;
      
      // Get the current main image source before changing it
      const currentMainSrc = mainImage.src;
      
      // Update main image with the selected thumbnail
      mainImage.src = thumbnails[currentSlide].src;
      mainImage.alt = thumbnails[currentSlide].alt;
      
      // Store the main image source in the clicked thumbnail
      thumbnails[currentSlide].src = currentMainSrc;
      thumbnails[currentSlide].alt = "Product thumbnail";
      
      // Update active dot indicator
      dots.forEach((dot, index) => {
          // Make the dot active if it corresponds to the current image
          const isActive = (currentSlide % 8) === index;
          dot.classList.toggle('active', isActive);
      });
  }
  
  // Add click event listener to thumbnails
  thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
          updateCarousel(index);
      });
  });
  
  // Add click event listener to dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          // Calculate the actual slide index based on dot index
          // For the first row of thumbnails
          if (index < 8) {
              updateCarousel(index);
          }
      });
  });
  
  // Add click event listeners to prev/next buttons
  prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
  });
  
  nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
  });
  
  // Reset function to restore the default state
  function resetCarousel() {
      // Restore the main image to product1.png
      mainImage.src = mainImageSrc;
      
      // Restore all thumbnails to their original sources
      thumbnails.forEach((thumbnail, index) => {
          thumbnail.src = imageSources[index];
      });
      
      // Reset current slide index and active dot
      currentSlide = 0;
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === 0);
      });
  }
  
  // Initialize the carousel with the default state
  document.addEventListener('DOMContentLoaded', () => {
      // Ensure the first image stays as the main image
      resetCarousel();
  });
      
      // Flavor selection
  const flavorOptions = document.querySelectorAll('input[name="flavor"]');
  
  // Get reference to the subscription option images that need to be updated
  // These are the images that show in the "Every 30 Days" included box
  const singleKitImage = document.querySelector('#single-kit-content .included-box:first-child img');
  const doubleKitImage = document.querySelector('#double-kit-content .included-box:first-child img');
  const doubleKitSecondImage = document.querySelector('#double-kit-content .included-box:first-child img:nth-child(2)');
  const tryOnceImage = document.querySelector('#try-once-content .included-box:first-child img');
  
  // Store the flavor image paths
  const flavorImages = {
      'original': 'assets/flavour.png',
      'matcha': 'assets/flavour2.png',
      'cacao': 'assets/flavour3.png'
  };
  
  // Add change event listener to each flavor option
  flavorOptions.forEach(option => {
      option.addEventListener('change', function() {
          // Get the ID of the selected flavor (original, matcha, or cacao)
          const selectedFlavorId = this.id;
          
          // Get the image path for the selected flavor
          const selectedImagePath = flavorImages[selectedFlavorId];
          
          // Update the images in all subscription options with the selected flavor image
          if (singleKitImage) {
              singleKitImage.src = selectedImagePath;
              singleKitImage.alt = selectedFlavorId + " flavor";
          }
          
          if (doubleKitImage) {
              doubleKitImage.src = selectedImagePath;
              doubleKitImage.alt = selectedFlavorId + " flavor";
          }
          
          if (doubleKitSecondImage) {
              doubleKitSecondImage.src = selectedImagePath;
              doubleKitSecondImage.alt = selectedFlavorId + " flavor";
          }
          
          if (tryOnceImage) {
              tryOnceImage.src = selectedImagePath;
              tryOnceImage.alt = selectedFlavorId + " flavor";
          }
      });
  });
  
  // Initialize with the default selected flavor (original)
  window.addEventListener('DOMContentLoaded', () => {
      const initialSelectedFlavor = document.querySelector('input[name="flavor"]:checked');
      if (initialSelectedFlavor) {
          // Trigger the change event to set initial images
          initialSelectedFlavor.dispatchEvent(new Event('change'));
      }
  });
      
      // Subscription selection
      const subscriptionOptions = document.querySelectorAll('.subscription-type');
          
      // Add click event listener to each option
      subscriptionOptions.forEach(option => {
          option.addEventListener('click', function() {
              // Get the ID of the clicked option
              const optionId = this.id;
              
              // Get the corresponding content ID
              const contentId = optionId.replace('-option', '-content');
              
              // Remove active class from all options and contents
              subscriptionOptions.forEach(opt => {
                  opt.classList.remove('active');
                  
                  // Find the radio button within this option and uncheck it
                  const radio = opt.querySelector('input[type="radio"]');
                  radio.checked = false;
              });
              
              // Hide all content sections
              document.querySelectorAll('.option-content').forEach(content => {
                  content.classList.remove('active');
              });
              
              // Add active class to clicked option
              this.classList.add('active');
              
              // Check the radio button in the clicked option
              this.querySelector('input[type="radio"]').checked = true;
              
              // Show the corresponding content
              document.getElementById(contentId).classList.add('active');
          });
      });
      
      // Add to cart button
      const generateLink = document.getElementById('generateLink');
  
  generateLink.addEventListener('click', function (e) {
    const selectedFlavor = document.querySelector('input[name="flavor"]:checked')?.id;
    const selectedSubscription = document.querySelector('input[name="subscription"]:checked')?.id;
  
    if (selectedFlavor && selectedSubscription) {
      const url = `https://Alcami/cart?flavor=${encodeURIComponent(selectedFlavor)}&subscription=${encodeURIComponent(selectedSubscription)}`;
      
      // Set the link's href dynamically so it redirects when clicked
      generateLink.href = url;
    } else {
      e.preventDefault(); // Stop redirection if inputs are not selected
      alert("Please select both a flavor and a subscription.");
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
