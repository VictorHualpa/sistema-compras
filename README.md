# 🛒 Sistema de Compras

Aplicación web desarrollada con **React (Vite)** en el frontend y **Node.js + Express + PostgreSQL** en el backend. Permite gestionar productos, marcas, unidades y familias con autenticación JWT.

---

## 📁 Estructura del Proyecto

```
webCompras/
├── app-compras/   # Frontend con React + TypeScript + MUI
├── backend/       # Backend con Express + PostgreSQL
```

---

## 🚀 Tecnologías

- Frontend: **React + Vite + TypeScript + Material UI**
- Backend: **Node.js + Express + PostgreSQL**
- Seguridad: **JWT (JSON Web Tokens)**
- Otros: **Tailwind CSS**, **MUI DataGrid**

---

## ⚙️ Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL instalado y funcionando
- Git

---

## 🧪 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/VictorHualpa/sistema-compras.git
cd sistema-compras
```

---

### 2. Configurar el Backend

```bash
cd backend
npm install
```

📄 Crear el archivo `.env`:

```env
PORT=5000
JWT_SECRET=miclaveultrasecreta
```

💾 Asegúrate de tener tu base de datos PostgreSQL creada y configurada.

📦 Ejecutar:

```bash
npm run dev
```

---

### 3. Configurar el Frontend

```bash
cd ../app-compras
npm install
npm run dev
```

🔗 Abre: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Acceso

Para ingresar, usa los campos de **nombre y apellido** del usuario autorizado en la base de datos.

---

## 📦 Funcionalidades

- ✅ Login con JWT
- ✅ Panel protegido
- ✅ CRUD de productos, unidades, marcas y familias
- ✅ Formularios modernos y responsivos
- ✅ Navbar + Sidebar adaptable a móvil

---

## 🧠 Autor

**Victor Hualpa**  
📧 [Tu correo o LinkedIn]

---

## 🪪 Licencia

MIT © 2025
