// addmember.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addMemberForm');
    const roleSelect = document.getElementById('role');
    const otherRoleGroup = document.getElementById('otherRoleGroup');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Show/hide other role input based on selection
    roleSelect.addEventListener('change', function() {
        otherRoleGroup.style.display = this.value === 'Other' ? 'block' : 'none';
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        
        // Get form values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const location = document.getElementById('location').value.trim();
        let role = roleSelect.value;
        
        if (role === 'Other') {
            const otherRole = document.getElementById('otherRole').value.trim();
            if (otherRole) {
                role = otherRole;
            }
        }

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !role) {
            showError('Please fill in all required fields');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Validate phone format
        if (!isValidPhone(phone)) {
            showError('Please enter a valid phone number');
            return;
        }

        // Create member object
        const member = {
            id: Date.now(),
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email,
            phone,
            location,
            role,
            dateAdded: new Date().toISOString()
        };

        // Get existing members or initialize empty array
        let members = JSON.parse(localStorage.getItem('members')) || [];
        
        // Add new member
        members.push(member);
        
        // Save back to localStorage
        localStorage.setItem('members', JSON.stringify(members));

        // Show success message
        showSuccess('Member added successfully!');

        // Reset form
        form.reset();
        otherRoleGroup.style.display = 'none';

        // Redirect to members page after delay
        setTimeout(() => {
            window.location.href = 'members.html';
        }, 1500);
    });

    // Helper functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^[+]?[0-9\s()-]{10,}$/.test(phone);
    }
});
