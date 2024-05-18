import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from '../src/app/MainApp/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/custom-sw.js')
            .then(reg => console.log('Custom Service Worker registered', reg))
            .catch(err => console.error('Custom Service Worker registration failed', err));
    });
}
