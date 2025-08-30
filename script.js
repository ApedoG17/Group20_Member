let members = JSON.parse(localStorage.getItem('members')) || [];
let editIndex = -1;

const memberForm = document.getElementById('memberForm');
const membersTable = document.getElementById('membersTable').getElementsByTagName('tbody')[0];
const submitBtn = document.getElementById('submitBtn');
const formSection = document.getElementById('formSection');
const tableSection = document.getElementById('tableSection');
const showFormBtn = document.getElementById('showFormBtn');
const showTableBtn = document.getElementById('showTableBtn');

// Show/hide sections
showFormBtn.addEventListener('click', () => {
    formSection.classList.remove('hidden');
    tableSection.classList.add('hidden');
});

showTableBtn.addEventListener('click', () => {
    tableSection.classList.remove('hidden');
    formSection.classList.add('hidden');
    displayMembers();
});

// Display members when page loads
displayMembers();

// Handle form submission
memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const memberId = document.getElementById('memberId').value;
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    
    if (editIndex === -1) {
        // Add new member
        const newMember = {
            id: Date.now(),
            name: name,
            role: role
        };
        members.push(newMember);
    } else {
        // Update existing member
        members[editIndex] = {
            id: parseInt(memberId),
            name: name,
            role: role
        };
        editIndex = -1;
        submitBtn.textContent = 'Add Member';
    }
    
    // Save to localStorage and update display
    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
    memberForm.reset();
});

function displayMembers() {
    membersTable.innerHTML = '';
    
    members.forEach((member, index) => {
        const row = membersTable.insertRow();
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
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
        members.splice(index, 1);
        localStorage.setItem('members', JSON.stringify(members));
        displayMembers();
    }
}
