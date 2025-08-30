// dashboard.js
// Dark/light mode toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeToggle.onclick = function() {
    document.body.classList.toggle('dark-mode');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
};
// Profile icon in nav
function getFirstName() {
    return localStorage.getItem('firstName') || '';
}
function isLoggedIn() {
    return localStorage.getItem('isRegistered') === 'true';
}
function renderNavAction() {
    const nav = document.getElementById('navAction');
    nav.innerHTML = '';
    if (isLoggedIn()) {
        // Log Out button
        const logoutBtn = document.createElement('a');
        logoutBtn.className = 'btn-login';
        logoutBtn.style = 'background:#ef4444; color:#fff; padding:0.5rem 1.2rem; border-radius:5px; font-weight:600; margin-right:0.5rem; text-decoration:none; transition:background 0.2s;';
        logoutBtn.textContent = 'Log Out';
        logoutBtn.href = '#';
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        };
        nav.appendChild(logoutBtn);
        // Profile initial icon
        const profileDiv = document.createElement('div');
        profileDiv.style = 'display:inline-block; position:relative;';
        const firstName = getFirstName();
        const initial = firstName ? firstName.charAt(0).toUpperCase() : 'U';
        profileDiv.innerHTML = `
            <span class="profile-initial" style="width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:#10b981; color:#fff; font-size:1.3rem; font-weight:700; vertical-align:middle; cursor:pointer; border:2px solid #10b981;">${initial}</span>
            <span style="margin-left:6px; font-size:1.2rem; color:#1e293b; vertical-align:middle; cursor:pointer;">▼</span>
            <div class="profile-dropdown" style="display:none; position:absolute; right:0; top:48px; background:#fff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.12); min-width:140px; z-index:100;">
                <a href="#" style="display:block; padding:0.7rem 1rem; color:#1e293b; text-decoration:none;">Profile</a>
                <a href="#" style="display:block; padding:0.7rem 1rem; color:#1e293b; text-decoration:none;">Settings</a>
                <a href="#" style="display:block; padding:0.7rem 1rem; color:#ef4444; text-decoration:none;" onclick="localStorage.clear();window.location.href='index.html';">Log Out</a>
            </div>
        `;
        nav.appendChild(profileDiv);
        // Dropdown logic
        const initialIcon = profileDiv.querySelector('.profile-initial');
        const arrow = profileDiv.querySelectorAll('span')[1];
        const dropdown = profileDiv.querySelector('.profile-dropdown');
        function toggleDropdown() {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
        initialIcon.onclick = arrow.onclick = toggleDropdown;
        document.addEventListener('click', function(e) {
            if (!profileDiv.contains(e.target)) dropdown.style.display = 'none';
        });
    } else {
        // Log In and Sign Up buttons
        const loginBtn = document.createElement('a');
        loginBtn.className = 'btn-login';
        loginBtn.style = 'background:#3b82f6; color:#fff; padding:0.5rem 1.2rem; border-radius:5px; font-weight:600; margin-right:0.5rem; text-decoration:none; transition:background 0.2s;';
        loginBtn.textContent = 'Log In';
        loginBtn.href = 'login.html';
        nav.appendChild(loginBtn);
        const signupBtn = document.createElement('a');
        signupBtn.className = 'btn-signup';
        signupBtn.style = 'background:#10b981; color:#fff; padding:0.5rem 1.2rem; border-radius:5px; font-weight:600; text-decoration:none; transition:background 0.2s;';
        signupBtn.textContent = 'Sign Up';
        signupBtn.href = 'registration.html';
        nav.appendChild(signupBtn);
    }
}
document.addEventListener('DOMContentLoaded', renderNavAction);
// Fill user details
function fillUserDetails() {
    document.getElementById('greeting').textContent = `Welcome, ${getFirstName()}!`;
    document.getElementById('detailFirstName').textContent = localStorage.getItem('firstName') || '';
    document.getElementById('detailSurname').textContent = localStorage.getItem('surname') || '';
    document.getElementById('detailMiddleName').textContent = localStorage.getItem('middleName') || '';
    document.getElementById('detailDOB').textContent = localStorage.getItem('dob') || '';
    document.getElementById('detailResidence').textContent = localStorage.getItem('residence') || '';
    document.getElementById('detailEmail').textContent = localStorage.getItem('email') || '';
    document.getElementById('detailPhone').textContent = localStorage.getItem('phone') || '';
    document.getElementById('detailRole').textContent = localStorage.getItem('role') || '';
}
document.addEventListener('DOMContentLoaded', fillUserDetails);
// Log out button
if(document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').onclick = function() {
        localStorage.clear();
        window.location.href = 'index.html';
    };
}
document.addEventListener('DOMContentLoaded', function() {
    var firstName = localStorage.getItem('firstName') || '';
    var initial = firstName ? firstName.charAt(0).toUpperCase() : 'U';
    if(document.getElementById('greetingIcon')) {
        document.getElementById('greetingIcon').textContent = initial;
    }
    if(document.getElementById('greeting')) {
        document.getElementById('greeting').textContent = `Welcome, ${firstName}!`;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Update member statistics
    function updateStats() {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Calculate statistics
        const totalMembers = members.length;
        const newMembers = members.filter(member => {
            const memberDate = new Date(member.id); // Using ID as timestamp
            return memberDate >= oneWeekAgo;
        }).length;
        const activeMembers = members.length; // All members are considered active

        // Update the display
        document.getElementById('totalMembers').textContent = totalMembers;
        document.getElementById('newMembers').textContent = newMembers;
        document.getElementById('activeMembers').textContent = activeMembers;

        // Update trend indicators
        const trends = document.querySelectorAll('.stat-trend');
        trends.forEach(trend => {
            if (totalMembers > 0) {
                trend.innerHTML = '<i class="fas fa-arrow-up"></i> Active';
                trend.className = 'stat-trend positive';
            } else {
                trend.innerHTML = '<i class="fas fa-minus"></i> No change';
                trend.className = 'stat-trend neutral';
            }
        });
    }

    // Update stats immediately and every minute
    updateStats();
    setInterval(updateStats, 60000);
});

function handleLogout() {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('firstName');
    window.location.href = 'index.html';
}

// Add click handler to logout button
document.querySelector('.logout').addEventListener('click', handleLogout);
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome message
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    }

    const firstName = localStorage.getItem('firstName') || 'User';
    const welcomeHtml = `
        <div class="welcome-message">
            <h1>${getGreeting()}, ${firstName}!</h1>
            <p>Welcome to your dashboard</p>
        </div>
    `;

    document.querySelector('.dashboard-container').insertAdjacentHTML('afterbegin', welcomeHtml);

    // Update profile name
    document.querySelector('.user-profile span').textContent = firstName;

    // Theme toggler
    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        // Search through members
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const filtered = members.filter(member => 
            member.fullName.toLowerCase().includes(term) ||
            member.email.toLowerCase().includes(term) ||
            member.role.toLowerCase().includes(term)
        );
        updateDashboardStats(filtered);
    });

    // Update dashboard stats
    function updateDashboardStats(members) {
        const total = members.length;
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const newMembers = members.filter(m => m.id > oneWeekAgo).length;
        
        document.getElementById('totalMembers').textContent = total;
        document.getElementById('newMembers').textContent = newMembers;
        document.getElementById('activeMembers').textContent = total; // All members considered active
    }

    // Initial stats update
    const allMembers = JSON.parse(localStorage.getItem('members')) || [];
    updateDashboardStats(allMembers);
});
