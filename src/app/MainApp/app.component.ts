import { Component, OnInit, inject } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { AuthService } from '../Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'kaiyanamiistore';
  private router = inject(Router);
  isAuthenticated: boolean = false;
  private _authService = inject(AuthService);
  isLoading = false
  public _auth = inject(Auth);
  public imageUrl:SafeUrl | undefined;
  private _sanitizer = inject(DomSanitizer);



  async ngOnInit() {
    // this.routerEvent();
    this.isLoading = true 
    this._router();
    try {
      await this.checkToken();
      
      this.loadUserImage();

    }catch(error) {
      console.log(error);

    }finally {
      this.isLoading = false;
    }

  }


  async checkToken() {
    this.isAuthenticated = await this._authService.getCookie() ? true : false;
    console.log(this.isAuthenticated);
    if(this.isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/landing']);
    }
  }

  private _router() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  loadUserImage() {
    this._authService.getUserProfileImage().then((result) => {
      // Bypass security and trust the given URL
      this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(result);
    }).catch(error => {
      console.error('Error loading the user image:', error);
    });
  }

  getTotalCartCount() {
    //here i get the total count for the cart 
  }

  logOut() {
    this._authService.deleteCookie();

  }
}

