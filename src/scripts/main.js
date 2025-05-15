document.addEventListener('DOMContentLoaded', () => {
    const pageManager = new PageManager();

    // Cargar el header y el footer
    pageManager.loadComponent('../public/components/header.html', 'header-container');
    pageManager.loadComponent('../public/components/footer.html', 'footer-container');

    // Manejo del menú hamburguesa
    document.addEventListener('click', (event) => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');

        if (menuToggle && navList && event.target === menuToggle) {
            menuToggle.classList.toggle('open');
            navList.classList.toggle('open');
        }
    });

    // Cargar contenido inicial
    loadPage('main'); // Cargar la página de inicio por defecto

    // Manejo de enlaces para cargar contenido dinámico
    document.addEventListener('click', (event) => {
        if (event.target.matches('.nav-list a')) {
            event.preventDefault(); // Evitar la navegación por defecto
            const page = event.target.getAttribute('href').substring(1); // Obtener el nombre de la página (sin el #)
            loadPage(page); // Cargar la página correspondiente
        }
    });
});

// Función para cargar contenido en el main
function loadPage(page) {
    const mainSection = document.getElementById('main-section');
    fetch(`../public/pages/${page}.html`) // Cambia la ruta según tu estructura de carpetas
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(html => {
            mainSection.innerHTML = html; // Cargar el contenido en el main
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
            mainSection.innerHTML = '<h2>Error al cargar la página</h2>'; // Mensaje de error
        });
}

class PageManager {
    constructor() {
        this.content = document.getElementById('main-content');
        this.isFirstVisit = !localStorage.getItem('hasVisited');

        // Si es la primera visita, se mantiene el contenido oculto
        if (this.isFirstVisit) {
            document.body.classList.add('initial-state');
        }
    }

    async loadComponent(url, targetId) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            document.getElementById(targetId).innerHTML = html;
        } catch (error) {
            console.error('Error al cargar el componente:', error);
        }
    }
}
