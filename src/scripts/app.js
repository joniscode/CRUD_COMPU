import mockBackend from './api.js';

export function runEmployeeCrud() {
    const employeeList = document.getElementById('employee-list');
    const modal = document.getElementById('formModal');
    const form = document.getElementById('itemForm');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');
    const selectAllCheckbox = document.getElementById('select-all');
    const addBtn = document.getElementById('add-employee-btn');

    if (!employeeList || !modal || !form || !deleteSelectedBtn || !selectAllCheckbox || !addBtn) {
        console.error('[CRUD] No se encontraron todos los elementos necesarios en el DOM');
        return;
    }

    const defaultImage = './img/avatar-perfil.png';

    function renderEmployees() {
        const employees = mockBackend.getEmployees();
        employeeList.innerHTML = '';

        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="select-employee" data-id="${employee.id}"></td>
                <td><img src="${employee.image || defaultImage}" alt="avatar" class="employee-image"></td>
                <td>${employee.name}</td>
                <td>${employee.surname}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.email}</td>
                <td>${employee.role}</td>
                <td>
                    <button class="edit-btn" data-id="${employee.id}">✏️ Editar</button>
                    <button class="delete-btn" data-id="${employee.id}">🗑 Eliminar</button>
                </td>
            `;
            employeeList.appendChild(row);
        });

        updateDeleteButton();
    }

    function openModal(employee = null) {
        modal.style.display = 'block';
        form.dataset.mode = employee ? 'edit' : 'create';

        if (employee) {
            form.dataset.employeeId = employee.id;
            form.name.value = employee.name;
            form.surname.value = employee.surname;
            form.dateOfBirth.value = employee.dateOfBirth;
            form.email.value = employee.email;
            form.role.value = employee.role;
        } else {
            form.reset();
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        form.reset();
    }

    function updateDeleteButton() {
        const selected = document.querySelectorAll('.select-employee:checked');
        deleteSelectedBtn.disabled = selected.length === 0;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const formData = new FormData(form);
        const employee = Object.fromEntries(formData.entries());
    
        if (!employee.name || !employee.surname || !employee.dateOfBirth || !employee.email || !employee.role) {
            alert('Todos los campos son obligatorios.');
            return;
        }
    
        const age = validateAge(employee.dateOfBirth);
        if (age < 18) {
            alert('La edad mínima es 18 años.');
            return;
        }
    
        const imageFile = form.image.files[0];
    
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                employee.image = e.target.result; // base64
                guardarEmpleado(employee);
            };
            reader.readAsDataURL(imageFile);
        } else {
            // Usar imagen anterior si estamos editando, o imagen por defecto si es nuevo
            if (form.dataset.mode === 'edit') {
                const currentEmployee = mockBackend.getEmployees().find(emp => emp.id === parseInt(form.dataset.employeeId));
                employee.image = currentEmployee?.image || defaultImage;
            } else {
                employee.image = defaultImage;
            }
            guardarEmpleado(employee);
        }
    });
    

    function guardarEmpleado(employee) {
        if (form.dataset.mode === 'edit') {
            const id = parseInt(form.dataset.employeeId);
            mockBackend.editEmployee(id, employee);
        } else {
            mockBackend.addEmployee(employee);
        }
        renderEmployees();
        closeModal();
    }

    employeeList.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (e.target.classList.contains('edit-btn')) {
            const emp = mockBackend.getEmployees().find(e => e.id === id);
            if (emp) openModal(emp);
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('¿Eliminar este empleado?')) {
                mockBackend.deleteEmployees([id]);
                renderEmployees();
            }
        }
    });

    selectAllCheckbox.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.select-employee');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        updateDeleteButton();
    });

    employeeList.addEventListener('change', updateDeleteButton);

    addBtn.addEventListener('click', () => openModal());

    const closeButton = document.querySelector('.close');
    if (closeButton) closeButton.addEventListener('click', closeModal);

    const cancelButton = document.querySelector('.btn-cancel');
    if (cancelButton) cancelButton.addEventListener('click', closeModal);

    function validateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    }

    renderEmployees();

    deleteSelectedBtn.addEventListener('click', () => {
        const selectedCheckboxes = document.querySelectorAll('.select-employee:checked');
        const idsToDelete = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.id));
    
        if (idsToDelete.length === 0) {
            alert('Selecciona al menos un empleado para eliminar.');
            return;
        }
    
        if (confirm(`¿Estás seguro de que deseas eliminar ${idsToDelete.length} empleados?`)) {
            mockBackend.deleteEmployees(idsToDelete);
            renderEmployees();
        }
    });
}
