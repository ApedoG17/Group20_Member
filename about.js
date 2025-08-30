// about.js
// Dark/light mode toggle for about page
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeToggle.onclick = function() {
    document.body.classList.toggle('dark-mode');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
};
