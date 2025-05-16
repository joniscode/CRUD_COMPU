import { runEmployeeCrud } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
    const pageManager = new PageManager();
  
    // Cargar header y footer
    pageManager.loadComponent('../public/components/header.html', 'header-container');
    pageManager.loadComponent('../public/components/footer.html', 'footer-container');
  
    // Menú hamburguesa
    document.addEventListener('click', (event) => {
      const menuToggle = document.querySelector('.menu-toggle');
      const navList = document.querySelector('.nav-list');
  
      if (menuToggle && navList && event.target === menuToggle) {
        menuToggle.classList.toggle('open');
        navList.classList.toggle('open');
      }
    });
  
    // Cargar contenido inicial
    loadPage('main');
  
    // Enlaces de navegación
    document.addEventListener('click', (event) => {
      if (event.target.matches('.nav-list a')) {
        event.preventDefault();
        const page = event.target.getAttribute('href').substring(1);
        loadPage(page);
      }
    });
  });
  
  function loadPage(page) {
    const mainSection = document.getElementById('main-section');
    fetch(`../public/pages/${page}.html`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la página');
        }
        return response.text();
      })
      .then(html => {
        mainSection.innerHTML = html;
  
        // Si la página cargada es "employees", inicializa el CRUD
        if (page === 'employees') {
          setTimeout(runEmployeeCrud, 0);
        }
      })
      .catch(error => {
        console.error('Error al cargar la página:', error);
        mainSection.innerHTML = '<h2>Error al cargar la página</h2>';
      });
  }
  
  class PageManager {
    constructor() {
      this.content = document.getElementById('main-content');
      this.isFirstVisit = !localStorage.getItem('hasVisited');
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
  
  
  