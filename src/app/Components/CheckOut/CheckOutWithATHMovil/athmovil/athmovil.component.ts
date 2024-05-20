import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-athmovil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './athmovil.component.html',
  styleUrl: './athmovil.component.css'
})
export class AthmovilComponent implements OnInit {

  ATHMovilPaymentData:any = {}

  ngOnInit() {
    this.getCheckoutATHMovil();
  }

  getCheckoutATHMovil() {
    let getCheckout = sessionStorage.getItem("checkoutATHMovil");
    let parseData = JSON.parse(getCheckout!);
    this.ATHMovilPaymentData = parseData;
    console.log(this.ATHMovilPaymentData);

  }

  async CanceledPayment() {
   await  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!'
    }).then(async(result) => {
        if (result.isConfirmed) {
            // Handle the cancellation logic here, e.g., calling a function to cancel the payment.
            
            // Show a second SweetAlert to confirm cancellation
            await Swal.fire({
              title:'Canceled!',
              titleText:"Your Payment has been canceled",
              icon:'success'
            })
            location.reload();
        }
    });
}


    async confirmedPayment() {
      await Swal.fire({
        title:`Paymemt Confirmed`,
        icon:'success',
        timer:1200
      })
      sessionStorage.removeItem("checkoutATHMovil");
      sessionStorage.removeItem("cartData");
      location.reload();
    }

}
