# AppCogs - Gestión de Costos

## Configuración de Firebase

Este proyecto usa Firebase como base de datos. Para configurarlo:

1. **Clona el repositorio**
2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura Firebase:**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Firestore Database
   - Copia los archivos de ejemplo:
     ```bash
     cp src/environments/environment.example.ts src/environments/environment.ts
     cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
     ```
   - Reemplaza las credenciales con las de tu proyecto Firebase

4. **Habilita Google Authentication:**
   - Ve a Firebase Console → **Authentication**
   - Haz clic en la pestaña **Sign-in method**
   - Habilita el proveedor **Google**
   - En la sección "Dominios autorizados", asegúrate de que `localhost` y tu dominio de producción estén incluidos
   - Si usas GitHub Pages, agrega: `tu-usuario.github.io`
   - **IMPORTANTE**: Configura un correo de soporte del proyecto (requerido por Google)
   - Guarda los cambios

5. **Habilita Email/Password Authentication:**
   - En la misma sección de **Sign-in method**
   - Habilita el proveedor **Email/Password**
   - No es necesario configurar nada adicional
   - Guarda los cambios

6. **Configura las reglas de Firestore:**
   - Ve a Firestore Database > Rules
   - Usa las reglas de desarrollo (ver documentación)

7. **Ejecuta la aplicación:**
   ```bash
   npm start
   ```

## Solución de Problemas

### Error: CONFIGURATION_NOT_FOUND

Si ves este error al intentar iniciar sesión con Google:

1. **Verifica que Google esté habilitado:**
   - Firebase Console → Authentication → Sign-in method
   - El proveedor "Google" debe estar **Habilitado** (no solo agregado)

2. **Configura el correo de soporte:**
   - En la configuración de Google Sign-In
   - Ingresa un email de soporte del proyecto (requerido)

3. **Verifica dominios autorizados:**
   - En Authentication → Settings → Authorized domains
   - Debe incluir `localhost` para desarrollo
   - Agrega tu dominio de producción si corresponde

4. **Espera unos minutos:**
   - Los cambios en Firebase pueden tardar 1-2 minutos en aplicarse
   - Recarga la página después de habilitar Google Sign-In

### Error: auth/unauthorized-domain

Si ves este error, el dominio desde el cual estás accediendo no está autorizado:

1. **Ve a Firebase Console**
2. **Authentication → Settings → Authorized domains**
3. **Agrega el dominio necesario:**
   - Para desarrollo local: `localhost`
   - Para GitHub Pages: `tu-usuario.github.io`
   - Para otros dominios: agrégalos exactamente como aparecen
4. **Guarda los cambios** y recarga la aplicación
5. **Espera 1-2 minutos** para que los cambios se apliquen

**Nota:** El error te dirá exactamente qué dominio necesitas agregar.

## Seguridad

⚠️ **IMPORTANTE:** Nunca subas tus archivos `environment.ts` y `environment.prod.ts` al repositorio. Ya están en `.gitignore`.

Las API keys de Firebase para web son públicas por diseño, pero la seguridad real viene de:
- Las reglas de Firestore
- Firebase Authentication (cuando se implemente)
- Las reglas de seguridad del proyecto

## Deploy a GitHub Pages

```bash
npm run build:prod
```

Los archivos generados estarán en `dist/app-cogs/`
