import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideServiceWorker } from '@angular/service-worker';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({ "projectId": "kaiyanamii", "appId": "1:1024037128828:web:298cedbfcfb685e782d7f9", "storageBucket": "kaiyanamii.appspot.com", "apiKey": "AIzaSyCPCTqti8-0vYKrxzRWBjPHhDvMkP3GePI", "authDomain": "kaiyanamii.firebaseapp.com", "messagingSenderId": "1024037128828", "measurementId": "G-B19R30DSC4" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage()), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideFirebaseApp(() => initializeApp({ "projectId": "kaiyanamii", "appId": "1:1024037128828:web:298cedbfcfb685e782d7f9", "storageBucket": "kaiyanamii.appspot.com", "apiKey": "AIzaSyCPCTqti8-0vYKrxzRWBjPHhDvMkP3GePI", "authDomain": "kaiyanamii.firebaseapp.com", "messagingSenderId": "1024037128828", "measurementId": "G-B19R30DSC4" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
