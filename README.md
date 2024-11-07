Este proyecto utiliza autenticación con Auth0, gestión de archivos con Cloudinary y TypeORM para la conexión con una base de datos PostgreSQL. A continuación, se detallan los pasos para la configuración y las variables de entorno necesarias.

## Requisitos previos

1. **Node.js** - Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2. **PostgreSQL** - Configura una base de datos PostgreSQL para almacenar los datos de tu aplicación.
3. **Auth0** - Configura una cuenta en [Auth0](https://auth0.com/).
4. **Cloudinary** - Crea una cuenta en [Cloudinary](https://cloudinary.com/) para la gestión de imágenes.

## Instalación
<ol>
  <li>
    <h3>Clona el repositorio:</h3>
     ```bash
      git clone <URL_DEL_REPOSITORIO>
      cd <NOMBRE_DEL_PROYECTO>
  </li>
  <li>
    <h3>Instala las dependencias:</h3>
    ```bash
    npm install
  </li>
  <li>
    <h3>Crea un archivo de variables de entorno: Crea un archivo .env.development en la raíz del proyecto con las siguientes variables de entorno:</h3>
    <ul>  
      <li>
        <ul>
          <h4>Configuración de Auth0</h4> 
        <li>AUTH0_SECRET=your_auth0_secret</li>
        <li>AUTH0_AUDIENCE=your_auth0_audience</li>
        <li>AUTH0_CLIENT_ID=your_auth0_client_id</li>
        <li>AUTH0_BASE_URL=https://yourdomain.auth0.com</li>
        </ul>
      </li>
      <li>
        <ul>
          <h4>Configuración de Cloudinary</h4>
          <li>CLOUDINARY_CLOUD_NAME=your_cloud_name</li>
          <li>CLOUDINARY_API_KEY=your_cloudinary_api_key</li>
          <li>CLOUDINARY_API_SECRET=your_cloudinary_api_secret</li>
        </ul>
      </li>
      <li>
        <ul>
        <h4>Configuración de PostgreSQL</h4> 
        <li>DB_NAME=your_database_name</li>
        <li>DB_HOST=localhost # O el host de tu base de datos</li>
        <li>DB_PORT=5432 # Cambiar si es necesario</li>
        <li>DB_USERNAME=your_database_user</li>
        <li>DB_PASSWORD=your_database_password</li>
        </ul>
      </li>
      
      
    </ul>
  </li>


  <li>
    <h3>Configura la base de datos PostgreSQL.</h3>
    Asegúrate de que la base de datos esté creada y accesible con las credenciales indicadas en el archivo .env.development.
  </li>
</ol>

## Configuración
Este proyecto utiliza dotenv para cargar las variables de entorno en los diferentes módulos. Los archivos de configuración se encuentran en las siguientes ubicaciones:
<ul>
  <li>
    <b>Auth0:</b> La configuración de Auth0 está en el archivo principal que exporta un objeto config con las credenciales y configuraciones necesarias.
  </li>
  <li>  
    <b>Cloudinary:</b> La configuración de Cloudinary está exportada en CloudinaryConfig, que utiliza useFactory para cargar las variables de entorno.
  </li>
  <li>
    <b>TypeORM:</b> La configuración de TypeORM se carga en typeormConfig y connectionSource, que utiliza los datos de conexión de la base de datos PostgreSQL.
  </li>
</ul>

## Ejecutar el Proyecto
1. Inicia la aplicación:
npm start
2. La aplicación debería estar en ejecución en localhost:<PUERTO> (cambiar <PUERTO> por el puerto configurado en tu servidor).
3. Asegúrate de que todas las configuraciones y variables de entorno sean correctas antes de ejecutar el proyecto para evitar problemas de conexión y autenticación.

