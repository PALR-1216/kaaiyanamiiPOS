import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {

  clientFinished: boolean = false
  private _router = inject(Router);

  canDeactivate(): boolean {
    if (!this.clientFinished) {
      Swal.fire({
        title:"if no receipt wanted press No thanks",
        icon:"warning",
        timer:1200,
        showConfirmButton:false
      })
      return false
    }
    return true;
  }

  NoReceipt() {
    this.clientFinished = true;
    this._router.navigate(['/home']);

  }

}
