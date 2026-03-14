// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.textContent.toLowerCase();
            
            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.blog-category')?.textContent.toLowerCase() || '';
                
                if (category === 'all' || postCategory.includes(category)) {
                    post.closest('.col-lg-4').style.display = 'block';
                } else {
                    post.closest('.col-lg-4').style.display = 'none';
                }
            });
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.blog-newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            showNotification('Thanks for subscribing! Check your email for confirmation.', 'success');
            this.reset();
        });
    }
    
    // Reading time estimation
    document.querySelectorAll('.blog-content p').forEach(paragraph => {
        const wordCount = paragraph.textContent.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
        
        const timeBadge = document.createElement('span');
        timeBadge.className = 'reading-time-badge';
        timeBadge.innerHTML = `<i class="bi bi-clock"></i> ${readingTime} min read`;
        
        // Add to parent if needed
    });
});