import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cash.component.html',
  styleUrl: './cash.component.css'
})
export class CashComponent implements OnInit {
  amountGiven: any = '';
  CashPaymentData:any = {};
  amountLeft:number = 0


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
    console.log(this.amountGiven);
    if(!this.amountGiven) {
      Swal.fire({
        title:"the amount given cant be empty",
        icon:'error',
        timer:1200
      })
    } else {
      if(this.amountGiven < this.CashPaymentData.totalAmountWithTax) {
        this.amountLeft =  this.CashPaymentData.totalAmountWithTax - Number(this.amountGiven)
        console.log("Amount left to pay: ", this.amountLeft)
        this.amountGiven = '';
        this.CashPaymentData.totalAmountWithTax = this.amountLeft
      } else if(this.amountLeft === this.CashPaymentData.totalAmountWithTax){
        console.log("Confirmed payment")

      }
    }
  }


}
