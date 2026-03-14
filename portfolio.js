// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.portfolio-item[style*="display: none"]');
            if (hiddenItems.length > 0) {
                for (let i = 0; i < Math.min(3, hiddenItems.length); i++) {
                    hiddenItems[i].style.display = 'block';
                    setTimeout(() => {
                        hiddenItems[i].style.opacity = '1';
                        hiddenItems[i].style.transform = 'scale(1)';
                    }, 100);
                }
            }
            
            // Hide button if no more items
            if (document.querySelectorAll('.portfolio-item[style*="display: none"]').length === 0) {
                this.style.display = 'none';
            }
        });
    }
});