import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public allItems:any[] = [];
  public totalAmount:number = 0;
  private _authService = inject(AuthService);
  private _router = inject(Router);
  ngOnInit() {
    this.getAllCarts();
    this.allItems = this.getAllCarts();
    console.log(this.allItems);
    this.getTotalAmount();

    // if(this.allItems)
  }

  refreshCart() {
    this.allItems = this.getAllCarts() || [];
    this.getTotalAmount();
  }

  getAllCarts() {
    // Attempt to get cart data from sessionStorage
    let items = sessionStorage.getItem("cartData");
  
    // Check if there is any data; if not, return null
    if (!items) {
      console.log("No cart data available.");
      return null;
    }
  
    // If there is data, parse it to an object
    let itemsObj = JSON.parse(items);
    // console.log(itemsObj);
    return itemsObj;
  }

  getTotalAmount() {
    this.totalAmount = 0;  // Reset total amount
    this.allItems.forEach(item => {
      let price = item.productPrice;
      this.totalAmount += price;
    });
  }

  RemoveItem(cartID: any) {
    // Retrieve the cart data from session storage
    const cartDataJSON = sessionStorage.getItem('cartData');
    
    // Check if there is cart data
    if (cartDataJSON) {
      // Parse the JSON string back into an array
      const cartData = JSON.parse(cartDataJSON);
  
      // Check if the cartData is indeed an array
      if (Array.isArray(cartData)) {
        // Find the index of the item with the given cartID
        const index = cartData.findIndex(item => item.cartID === cartID);
        
        // If the item exists in the array
        if (index !== -1) {
          // Remove the item from the array
          cartData.splice(index, 1);
          
          // Update session storage with the new array
          sessionStorage.setItem('cartData', JSON.stringify(cartData));
          this.refreshCart();
          
        } else {
        }
      } else {
      }
    } else {
    }
  }

  PayWithAthMovil() {
    //pay with ath Movil
    //save the current price and tax in the session
    let checkoutATHMovilObj = {
      checkoutID:crypto.randomUUID(),
      EmployeeID: this._authService.checkCookie("userID"),
      totalAmount:this.totalAmount,
      totalTax:Number(this.totalAmount * Number((11.5 / 100))),
      totalAmountWithTax:this.totalAmount * (11.5 / 100) + this.totalAmount
    } 
    let dataJSON = JSON.stringify(checkoutATHMovilObj);
    let checkoutData = sessionStorage.setItem("checkoutATHMovil", dataJSON);
    this._router.navigate(['/athMovil']);

  }
  
}
