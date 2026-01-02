// INSTRUCCIONES:
// 1. Copia este archivo como environment.ts
// 2. Ve a Firebase Console: https://console.firebase.google.com/
// 3. Selecciona tu proyecto
// 4. Ve a Project Settings > General > Your apps
// 5. Copia tus credenciales de Firebase aquí

export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
