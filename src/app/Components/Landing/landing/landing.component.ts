import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm = new FormGroup({
    email:new FormControl("", Validators.required),
    password:new FormControl("", Validators.required)
  })


  login() {

      this._authService.login(this.loginForm.value.email!, this.loginForm.value.password!).then(user => {
        this._authService.setCookie(user.user.uid);
        Swal.fire({
          title:`user logged in with id: ${user.user.uid}`,
          icon:"success",
          timer:1200
        })
        location.reload();
  
      })
  }


  logInWithGoogle() {

    this._authService.loginWithGoogle().then((result) => {
      // this._authService.generateUser(result.user.displayName!, "", result.user.email!, result.user.uid);
      this._authService.setCookie(result.user.uid);


      
      
    }).catch((error) => {
      alert(error.message)
    })
    location.reload();
  }

}