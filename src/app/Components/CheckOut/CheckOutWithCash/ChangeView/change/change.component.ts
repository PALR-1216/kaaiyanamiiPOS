import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-change',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change.component.html',
  styleUrl: './change.component.css'
})
export class ChangeComponent implements OnInit {
  changeAmount: any = {}
  isButtonClicked: boolean = false;
  private _firestore = inject(Firestore);
  private _router = inject(Router);

  ngOnInit(): void {
    this.getChange();
  }

  getChange() {
    this.changeAmount = sessionStorage.getItem('change');
    let parseItem = JSON.parse(this.changeAmount);
    this.changeAmount = parseItem;
    console.log(this.changeAmount);
  }

  canDeactivate(): boolean {
    if (!this.isButtonClicked) {
      Swal.fire({
        title:"please continue the process",
        icon:"warning",
        timer:1200,
        showConfirmButton:false
      })
      return false
    }
    return true;
  }


  async CompletePayment() {
    try {
      await this.SaveSale();
      await this.SaveTransaction();
      
    } catch (error) {
      
    }
   
  }
  async SaveSale() {
    let cartObj:any = sessionStorage.getItem("cartData");
    let checkoutObj:any = sessionStorage.getItem("checkout");
    let cartData = JSON.parse(cartObj);
    let checkoutData = JSON.parse(checkoutObj);
    let itemsObj:any = {};

    if (!cartObj || !checkoutObj) {
      console.error('Cart data or checkout data not found in sessionStorage.');
      return;
    }

    let salesObj:any = {
      SaleDate:new Date(),
      SaleID:crypto.randomUUID(),
      EmployeeID:checkoutData.EmployeeID,
      TotalAmount:checkoutData.totalAmount,
      TotalTax:Number(checkoutData.totalTax.toFixed(2)),
      SoldItems:[]
    }

    cartData.forEach((item:any) => {
       itemsObj = {
        itemID:item.itemID,
        ProductName:item.productName,
        ProductPrice:item.productPrice,
        SelectedSize:item.selectedSize
      }
      salesObj.SoldItems.push(itemsObj);
      
    });
    let saleJson = JSON.stringify(salesObj);
    sessionStorage.setItem("sale", saleJson);
    // let ref = collection(this._firestore, "Sales");
    sessionStorage.removeItem("change");
    sessionStorage.removeItem("cartData");
    sessionStorage.removeItem("checkout");
    // await addDoc(ref, salesObj);
    this.isButtonClicked = true;
    this._router.navigate(['/Receipt'])

  }

  async SaveTransaction() {

  }

}


 





