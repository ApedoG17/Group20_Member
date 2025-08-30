let members = JSON.parse(localStorage.getItem('members')) || [];
const form = document.getElementById('memberForm');
const submitBtn = document.getElementById('submitBtn');
const tbody = document.querySelector('#membersTable tbody');

function displayMembers() {
    tbody.innerHTML = '';
    members.forEach((member, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.role}</td>
            <td>
                <button class="edit" onclick="editMember(${index})">Edit</button>
                <button class="delete" onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const memberId = document.getElementById('memberId').value;

    if (memberId) {
        // Update existing member
        const index = members.findIndex(m => m.id === parseInt(memberId));
        members[index] = { ...members[index], name, role };
        submitBtn.textContent = 'Add Member';
    } else {
        // Add new member
        const id = members.length ? Math.max(...members.map(m => m.id)) + 1 : 1;
        members.push({ id, name, role });
    }

    localStorage.setItem('members', JSON.stringify(members));
    form.reset();
    document.getElementById('memberId').value = '';
    displayMembers();
});

function editMember(index) {
    const member = members[index];
    document.getElementById('memberId').value = member.id;
    document.getElementById('name').value = member.name;
    document.getElementById('role').value = member.role;
    submitBtn.textContent = 'Update Member';
}

function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        members.splice(index, 1);
        localStorage.setItem('members', JSON.stringify(members));
        displayMembers();
    }
}

// Initial display
displayMembers();
