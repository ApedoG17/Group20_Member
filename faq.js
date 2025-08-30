// faq.js
// FAQ expand/collapse logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
    q.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('active');
    });
});
