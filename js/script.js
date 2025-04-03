document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Search toggle functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const navLinks = document.querySelector('.nav');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            searchBar.classList.toggle('active');
            navLinks.classList.toggle('hidden');
            
            // Focus the input when search is active
            if (searchBar.classList.contains('active')) {
                searchBar.querySelector('input').focus();
            }
        });
    }
    
    // Close menu and search when clicking outside
    document.addEventListener('click', function(event) {
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
    document.addEventListener('keydown', function(event) {
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
});