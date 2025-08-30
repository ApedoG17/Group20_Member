// login.js
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
loginForm.onsubmit = function(e) {
    e.preventDefault();
    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value;
    // Get saved user data
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');
    const savedPassword = localStorage.getItem('password');
    // Accept either email or phone
    if ((identifier === savedEmail || identifier === savedPhone) && password === savedPassword) {
        localStorage.setItem('isRegistered', 'true');
        window.location.href = 'dashboard.html';
    } else {
        loginError.textContent = 'Invalid credentials. Please check your email/phone and password.';
    }
};
// Google login button (demo only)
document.querySelector('.google-btn').onclick = function() {
    alert('Google login is not implemented in this demo.');
};
