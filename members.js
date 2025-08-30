const membersTable = document.getElementById('membersTable').getElementsByTagName('tbody')[0];

function displayMembers() {
    membersTable.innerHTML = '';
    
    members.forEach((member, index) => {
        const fullName = `${member.firstName} ${member.middleName ? member.middleName + ' ' : ''}${member.surname}`.trim();
        const row = membersTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${fullName}</td>
            <td>${member.role}</td>
            <td>
                <button class="edit-btn" onclick="editMember(${member.id})">Edit</button>
                <button class="delete-btn" onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
    });
}

function editMember(id) {
    window.location.href = `registration.html?edit=${id}`;
}

function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        members.splice(index, 1);
        localStorage.setItem('members', JSON.stringify(members));
        displayMembers();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const membersTableBody = document.querySelector('#membersTable tbody');
    const searchInput = document.getElementById('searchInput');

    function displayMembers(members = null) {
        const allMembers = members || JSON.parse(localStorage.getItem('members')) || [];
        membersTableBody.innerHTML = '';
        
        if (allMembers.length === 0) {
            membersTableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem;">
                        No members found. <a href="addmember.html">Add a member</a>
                    </td>
                </tr>`;
            return;
        }

        allMembers.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.id}</td>
                <td>${member.fullName}</td>
                <td>${member.email}</td>
                <td>${member.phone}</td>
                <td>${member.role}</td>
                <td>
                    <button onclick="editMember(${member.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteMember(${member.id})" class="delete-btn">Delete</button>
                </td>
            `;
            membersTableBody.appendChild(row);
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const members = JSON.parse(localStorage.getItem('members')) || [];
            const filteredMembers = members.filter(member => 
                member.fullName.toLowerCase().includes(searchTerm) ||
                member.email.toLowerCase().includes(searchTerm) ||
                member.role.toLowerCase().includes(searchTerm)
            );
            displayMembers(filteredMembers);
        });
    }

    // Delete member function
    window.deleteMember = function(id) {
        if (confirm('Are you sure you want to delete this member?')) {
            let members = JSON.parse(localStorage.getItem('members')) || [];
            members = members.filter(member => member.id !== id);
            localStorage.setItem('members', JSON.stringify(members));
            displayMembers();
        }
    };

    // Edit member function
    window.editMember = function(id) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const member = members.find(m => m.id === id);
        if (member) {
            localStorage.setItem('editingMember', JSON.stringify(member));
            window.location.href = 'addmember.html?edit=true';
        }
    };

    // Initial display of members
    displayMembers();
});
