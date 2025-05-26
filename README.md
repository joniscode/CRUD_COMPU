# CRUD Compu Web (Frontend)

Este proyecto es una aplicación web estática desarrollada con HTML, JavaScript y SCSS que permite realizar un CRUD básico de empleados. Está diseñada para ser desplegada fácilmente en plataformas como [Vercel](https://vercel.com), sin necesidad de un backend.

---

## 📁 Estructura del proyecto

```
CRUD_COMPU/
├── public/
│   ├── components/       # Header y Footer HTML reutilizables
│   ├── img/              # Imágenes utilizadas en la interfaz
│   ├── pages/            # Páginas internas (about, contacto, empleados)
├── src/
│   ├── scripts/          # Lógica JavaScript modularizada
│   └── styles/           # Estilos en SCSS + CSS compilado
├── index.html            # Página principal
```

---

## 🚀 Cómo ejecutar en local

1. Clona este repositorio:

```bash
git clone https://github.com/joniscode/CRUD_COMPU/
cd CRUD_COMPU
```

2. Instala Sass si no lo tienes:

```bash
npm install -g sass
```

3. Compila SCSS a CSS (esto generará el archivo `styles.css` a partir de `main.scss`):

```bash
sass src/styles/main.scss src/styles/styles.css
```

> ⚠️ Importante: Este paso **solo es necesario en desarrollo**. Para producción, ya debes subir el archivo `styles.css` generado.

4. Abre `index.html` directamente en tu navegador o usa un servidor local como:

```bash
npx live-server
```

---

## 🌐 Quieres Despliegar en Vercel

1. Sube el proyecto a tu cuenta de GitHub.
2. Accede a [vercel.com](https://vercel.com) y crea una cuenta o inicia sesión.
3. Conecta tu cuenta de GitHub.
4. Selecciona el repositorio `CRUD_COMPU`.
5. En la configuración de despliegue:

   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
   - **Build Command**: _(vacío)_
   - **Output Directory**: _(vacío)_

6. Haz clic en **Deploy**.

Vercel detectará el archivo `index.html` en la raíz y lo servirá como entrada principal.

---

## 🧪 Tecnologías utilizadas

- HTML5
- CSS3 / SCSS / BEM
- JavaScript (Vanilla JS)
- [Sass](https://sass-lang.com/) para preprocesar estilos

---

## 📸 Vista previa

/public/img/preview.png

```

---

## 📌 Recomendaciones

- Antes de cada despliegue, asegúrate de compilar SCSS → CSS manualmente.
- Utiliza rutas relativas (`./public/...`) para imágenes y componentes.
- El sitio no tiene backend ni base de datos; toda la lógica es del lado del cliente.

---

## 🧑‍💻 Autor

Desarrollado por Jonathan Arevalo – [joniscode.dev](https://joniscode.com)