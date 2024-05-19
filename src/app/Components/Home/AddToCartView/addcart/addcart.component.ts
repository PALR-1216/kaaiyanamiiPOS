import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../Services/AuthService/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {
  private _firestore = inject(Firestore);
  private _route = inject(ActivatedRoute);
  private _auth = inject(AuthService);
  itemID = Number(this._route.snapshot.params['ID']);
  selectedSize: string = '';
  itemObj: any = {};

  async ngOnInit() {
    await this.getItemWithID();
  }

  async getItemWithID() {
    try {
      const ref = collection(this._firestore, "Items");
      const q = query(ref, where("itemID", "==", this.itemID));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach(doc => {
        this.itemObj = doc.data();
        console.log(doc.data());
      });
    } catch (error) {
      console.error("Failed to fetch item:", error);
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  AddToCart() {
    if (this.selectedSize === '') { // Checking if the size is empty
      Swal.fire({
        title: "Please select the size",
        icon: 'warning',
        showConfirmButton: true,
        timer: 2000
      });
      return; // Stop the function if no size selected
    } else {

      const cartID = crypto.randomUUID()// Generate a unique cart ID

      // Create the cart object with cartID as a key
      let cartData = {
        [cartID]: {
          employeeID: this._auth.checkCookie("userID"),
          itemID: this.itemID,
          productName: this.itemObj.Item_Name,
          productPrice: this.itemObj.Price,
          Item_Image: this.itemObj.Item_Image,
          selectedSize: this.selectedSize // Store the selected size
        }
      };

      console.log(cartData);
      let existingCartData = JSON.parse(sessionStorage.getItem('cartData')!) || {};
      console.log(existingCartData)
      existingCartData[cartID] = cartData[cartID];
      sessionStorage.setItem('cartData', JSON.stringify(existingCartData));
    }
  }
}
