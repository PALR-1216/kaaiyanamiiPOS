import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-addcart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addcart.component.html',
  styleUrl: './addcart.component.css'
})
export class AddcartComponent implements OnInit{

  private _firestore = inject(Firestore);
  private _route = inject(ActivatedRoute);
  private _auth = inject(AuthService);
  itemID = Number(this._route.snapshot.params['ID']);
  selectedSize: string = '';
  itemObj:any = {}
  async ngOnInit() {
    await this.getItemWithID();
    
  }

  async getItemWithID() {
    try {
      let ref = collection(this._firestore, "Items");
      let q = query(ref, where("itemID", "==", this.itemID));
      let snapshot = await getDocs(q);
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
    let cartObj = {
      cartID:crypto.randomUUID(),
      employeeID: this._auth.checkCookie("userID"),
      itemID:this.itemID,
      productName:this.itemObj.Item_Name,
      productPrice:this.itemObj.Price,
    }

    console.log(cartObj);

  }
}
