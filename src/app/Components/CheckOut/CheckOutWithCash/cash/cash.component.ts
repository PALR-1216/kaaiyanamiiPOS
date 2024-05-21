import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  amountGiven: any = '';
  CashPaymentData: any = {};
  amountLeft: number = 0;
  private _router = inject(Router);
  clientFinished:boolean = false

  ngOnInit(): void {
      this.getCheckoutCash();
  }

  ValidateNumber(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab', 'Delete', 'Enter', 'Period', 'NumpadDecimal'];
    const key = event.key;

    // Allow controls and numbers, disallow letters and special characters
    if (!allowedKeys.includes(key) && (isNaN(Number(key)) && event.key !== '.')) {
      event.preventDefault();
    }
  }

  getCheckoutCash() {
    let getCheckout = sessionStorage.getItem("checkout");
    let parseData = JSON.parse(getCheckout!);
    this.CashPaymentData = parseData;
    console.log(this.CashPaymentData);
  }

  processPayment() {
    
    if (!this.amountGiven) {
      Swal.fire({
        title: "The amount given can't be empty",
        icon: 'error',
        timer: 1200
      });
      return; // Stop further execution if no amount is given
    }
  
    // Check if the total amount due is provided
    if (!this.CashPaymentData.totalAmountWithTax) {
      Swal.fire({
        title: "Confirmation",
        text: "Total due is not provided. Are you sure you want to proceed?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Payment processed with empty total due.");
        }
      });
      return;
    }
  
    // Handle case when the amount given is less than the total due
    if (this.amountGiven < this.CashPaymentData.totalAmountWithTax) {
      this.amountLeft = this.CashPaymentData.totalAmountWithTax - Number(this.amountGiven);
      this.amountLeft = Number(this.amountLeft.toFixed(2)); // Round the remaining amount to two decimal places
      console.log("Amount left to pay: ", this.amountLeft);
      this.amountGiven = '';
      this.CashPaymentData.totalAmountWithTax = this.amountLeft;
    } else if (this.amountGiven > this.CashPaymentData.totalAmountWithTax) {

      // Handle case when the amount given is more than the total due
      const change:any = this.amountGiven - this.CashPaymentData.totalAmountWithTax;
      console.log("Change to be returned: $", change.toFixed(2));
      this.amountGiven = ''; // Reset amount given after processing
      this.CashPaymentData.totalAmountWithTax = 0; // Reset the total due to zero
      sessionStorage.setItem("change", JSON.stringify(change.toFixed(2))); // Store the change to be returned in session storage
      this._router.navigate(['/changeView']);
      this.clientFinished = true;
    } else {
      // Handle exact payment
      Swal.fire({
        title: 'Payment Complete',
        text: 'The full amount has been paid.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      console.log("Confirmed payment");
      this.amountGiven = ''; // Reset amount given
      this.CashPaymentData.totalAmountWithTax = 0; // Reset the total due
      this.clientFinished = true;
    }
  }

  canDeactivate(): boolean {
    if (!this.clientFinished) {
      return confirm('You havent finish the payment process do you wish to leave?');
    }
    return true;
  }
}