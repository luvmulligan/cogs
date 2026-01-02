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

4. **Configura las reglas de Firestore:**
   - Ve a Firestore Database > Rules
   - Usa las reglas de desarrollo (ver documentación)

5. **Ejecuta la aplicación:**
   ```bash
   npm start
   ```

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
