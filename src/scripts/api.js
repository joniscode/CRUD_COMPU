class StorageManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    // Obtener empleados desde localStorage
    getItems() {
        const items = localStorage.getItem(this.storageKey);
        return items ? JSON.parse(items) : [];
    }

    // Guardar empleados en localStorage
    setItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
}

// Instancia del StorageManager
const storage = new StorageManager('employees');

// Inicializar datos si no existen en localStorage
if (!localStorage.getItem('employees')) {
    const initialEmployees = [
        { id: 1, name: 'Juan', surname: 'Pérez', dateOfBirth: '1990-05-15', email: 'juan.perez@example.com', role: 'Desarrollador', image: '../img/avatar-perfil.png' },
        { id: 2, name: 'Ana', surname: 'Gómez', dateOfBirth: '1985-03-22', email: 'ana.gomez@example.com', role: 'Team Leader', image: '../img/avatar-perfil.png' },
        { id: 3, name: 'Carlos', surname: 'Ramírez', dateOfBirth: '1992-08-10', email: 'carlos.ramirez@example.com', role: 'CTO', image: '../img/avatar-perfil.png' }
    ];
    storage.setItems(initialEmployees);
}

// Mock Backend que utiliza localStorage
const mockBackend = {
    // Obtener empleados desde localStorage
    getEmployees() {
        return storage.getItems();
    },

    // Agregar un nuevo empleado
    addEmployee(employee) {
        const employees = storage.getItems();
        employee.id = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1; // Generar ID único
        employees.push(employee);
        storage.setItems(employees);
    },

    // Editar un empleado existente
    editEmployee(id, updatedEmployee) {
        const employees = storage.getItems();
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...updatedEmployee };
            storage.setItems(employees);
        }
    },

    // Eliminar empleados por ID
    deleteEmployees(ids) {
        let employees = storage.getItems();
        employees = employees.filter(emp => !ids.includes(emp.id));
        storage.setItems(employees);
    }
};
console.log('[MOCKBACKEND] Empleados iniciales cargados:', storage.getItems());

export default mockBackend;


