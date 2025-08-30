document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const errorDiv = document.getElementById('registrationError');
    const successDiv = document.getElementById('registrationSuccess');

    // Password visibility toggle
    function togglePasswordVisibility(inputId, toggleIcon) {
        const input = document.getElementById(inputId);
        const icon = toggleIcon.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Setup password toggles
    if (togglePassword) {
        togglePassword.addEventListener('click', () => togglePasswordVisibility('password', togglePassword));
    }
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', () => togglePasswordVisibility('confirmPassword', toggleConfirmPassword));
    }

    // Form validation and submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showError('Please fill in all required fields');
                return;
            }

            if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
                showError('Names should only contain letters');
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (password.length < 8) {
                showError('Password must be at least 8 characters long');
                return;
            }

            if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
                showError('Password must contain uppercase, lowercase, number and special character');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (!terms) {
                showError('Please agree to the Terms & Conditions');
                return;
            }

            // Save user data
            const userData = {
                id: Date.now(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: btoa(password) // Basic encoding (not for production)
            };

            // Store in localStorage
            localStorage.setItem('isRegistered', 'true');
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('email', email);
            localStorage.setItem('userData', JSON.stringify(userData));

            showSuccess('Registration successful! Redirecting to dashboard...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }

    function showError(message) {
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function showSuccess(message) {
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Real-time password validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function(e) {
            const password = e.target.value;
            let feedback = [];
            
            if (password.length < 8) feedback.push('At least 8 characters');
            if (!/[A-Z]/.test(password)) feedback.push('One uppercase letter');
            if (!/[a-z]/.test(password)) feedback.push('One lowercase letter');
            if (!/[0-9]/.test(password)) feedback.push('One number');
            if (!/[!@#$%^&*]/.test(password)) feedback.push('One special character');
            
            const requirements = feedback.length ? 'Missing: ' + feedback.join(', ') : 'Password is strong!';
            this.setCustomValidity(feedback.length ? requirements : '');
            
            // Update validity UI
            if (feedback.length) {
                this.classList.remove('valid');
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
    }
});
