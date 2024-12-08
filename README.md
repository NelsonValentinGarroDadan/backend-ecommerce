# 🛍️ **Gestor de e-commerce | Backend** 🛒  

Este es el backend de un gestor de eCommerce, diseñado para gestionar compras de un solo producto. Utiliza **NestJS** con **TypeScript** para el desarrollo y se conecta a **PostgreSQL**. Además, la autenticación de usuarios está gestionada mediante **Auth0** y el almacenamiento de imágenes se realiza con **Cloudinary**.  

### 🔗 **[Ver el proyecto en vivo aquí](https://ecommerce-peh6.onrender.com)**  
### 📚 **[Documentación de la API con Swagger](https://ecommerce-peh6.onrender.com/api)**  

---

## 🚀 **Características principales**  
- 🛒 Gestión de compras de un solo producto.  
- 🔒 Autenticación de usuarios con **Auth0**.  
- 🖼️ Gestión de imágenes a través de **Cloudinary**.  
- 🗃️ Conexión con **PostgreSQL** mediante **TypeORM**.  
- 📑 Documentación interactiva con **Swagger**.

---

## ⚙️ **Tecnologías usadas**  
<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Auth0-000000?style=for-the-badge&logo=auth0&logoColor=white" alt="Auth0" />
  <img src="https://img.shields.io/badge/Cloudinary-FF7F00?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Swagger-85C1E9?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</p>

---

## 📋 **Requisitos previos**  
1. **Node.js** - Asegúrate de tener [Node.js](https://nodejs.org/) instalado.  
2. **PostgreSQL** - Configura una base de datos PostgreSQL para almacenar los datos de la aplicación.  
3. **Auth0** - Configura una cuenta en [Auth0](https://auth0.com/).  
4. **Cloudinary** - Crea una cuenta en [Cloudinary](https://cloudinary.com/).  

---

## ⚡ **Instalación**  
1. Clona el repositorio:  
   ```bash
   git clone https://github.com/NelsonValentinGarroDadan/backend-ecommerce.git
   cd backend-ecommerce
Instala las dependencias:

```bash
npm install
```
2. Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

- Configuración de Auth0

```bash
AUTH0_SECRET=your_auth0_secret
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_BASE_URL=https://yourdomain.auth0.com
```
- Configuración de Cloudinary

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
- Configuración de PostgreSQL
```bash
DB_NAME=your_database_name
DB_HOST=localhost # O el host de tu base de datos
DB_PORT=5432 # Cambiar si es necesario
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```
3. Configura la base de datos PostgreSQL: <br>
Asegúrate de que la base de datos esté creada y accesible con las credenciales indicadas en el archivo .env.

## ⚙️ **Configuración del Proyecto**
Este proyecto usa dotenv para cargar las variables de entorno en los diferentes módulos. Los archivos de configuración se encuentran en las siguientes ubicaciones:

- Auth0: La configuración de Auth0 está en el archivo principal que exporta un objeto con las credenciales y configuraciones necesarias.
- Cloudinary: La configuración de Cloudinary se exporta en CloudinaryConfig.
- TypeORM: La configuración de TypeORM se carga en typeormConfig y connectionSource, que utiliza los datos de conexión de la base de datos PostgreSQL.
## 🚀 **Ejecutar el Proyecto**
1. Inicia la aplicación:

```bash
npm start
```
La aplicación estará disponible en http://localhost:PUERTO (cambia PUERTO por el puerto configurado en tu servidor).

Asegúrate de que todas las configuraciones y variables de entorno sean correctas para evitar problemas de conexión y autenticación.

## 🖇️ **Enlaces importantes**
- 🌐 [Deploy del Backend](https://ecommerce-peh6.onrender.com)
- 📚 [Documentación de la API con Swagger](https://ecommerce-peh6.onrender.com/api)
<p align="center"> ¡Disfruta explorando y gestionando tu e-commerce! 🐧 </p>
