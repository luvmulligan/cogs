# Reglas de Seguridad de Firestore

Para habilitar la seguridad de la aplicación, actualiza las reglas de Firestore en Firebase Console:

## Reglas Recomendadas

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Función auxiliar para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Función para verificar que el usuario es dueño del documento
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Reglas para la colección businesses
    match /businesses/{businessId} {
      // Permitir lectura solo si el usuario está autenticado y es el dueño
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      
      // Permitir crear solo si está autenticado y el userId coincide
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      
      // Permitir actualizar solo si está autenticado y es el dueño
      allow update: if isAuthenticated() && isOwner(resource.data.userId);
      
      // Permitir eliminar solo si está autenticado y es el dueño
      allow delete: if isAuthenticated() && isOwner(resource.data.userId);
    }
    
    // Reglas para la colección products
    match /products/{productId} {
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update: if isAuthenticated() && isOwner(resource.data.userId);
      allow delete: if isAuthenticated() && isOwner(resource.data.userId);
    }
    
    // Reglas para la colección costs
    match /costs/{costId} {
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update: if isAuthenticated() && isOwner(resource.data.userId);
      allow delete: if isAuthenticated() && isOwner(resource.data.userId);
    }
    
    // Reglas para la colección businessFixedCosts
    match /businessFixedCosts/{costId} {
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update: if isAuthenticated() && isOwner(resource.data.userId);
      allow delete: if isAuthenticated() && isOwner(resource.data.userId);
    }
    
    // Denegar todo el resto por defecto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Pasos para Actualizar

1. Ve a Firebase Console: https://console.firebase.google.com/
2. Selecciona tu proyecto
3. En el menú lateral, haz clic en **Firestore Database**
4. Haz clic en la pestaña **Reglas**
5. Reemplaza las reglas existentes con las reglas de arriba
6. Haz clic en **Publicar**

## ⚠️ Actualización Necesaria en el Código

**IMPORTANTE**: Para que estas reglas funcionen, debes actualizar `FirebaseBusinessService` para agregar el campo `userId` a todos los documentos creados.

Modifica el servicio para incluir el UID del usuario autenticado en cada documento:

```typescript
async addBusiness(business: Omit<Business, 'id'>): Promise<string> {
  const user = this.auth.currentUser;
  if (!user) throw new Error('Usuario no autenticado');
  
  const businessRef = await addDoc(collection(this.firestore, 'businesses'), {
    ...business,
    userId: user.uid  // Agregar este campo
  });
  return businessRef.id;
}
```

Repite este patrón para todos los métodos `add*` en el servicio.

## Reglas Actuales (Modo Test)

Las reglas actuales permiten acceso completo sin autenticación (modo de prueba):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Estas reglas son inseguras y deben actualizarse antes de lanzar a producción.**
