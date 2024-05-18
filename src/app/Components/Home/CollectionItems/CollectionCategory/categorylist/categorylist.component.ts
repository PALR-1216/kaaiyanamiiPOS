import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorylist',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent implements OnInit {


  //here you get all the items depending on the category 
  private _route = inject(ActivatedRoute);
  private _firestore = inject(Firestore);
  category = this._route.snapshot.params['collectionName'];
  allItems: any[] = []


  async ngOnInit() {
    //here get all the items from that categroy
    await this.getCategoryItems();

  }

  async getCategoryItems() {
    try {
      let ref = collection(this._firestore, "Items");
      let q = query(ref, where("collectionName", "==", this.category));
      let snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        this.allItems.push(doc.data());
      })
    } catch (error) {
      console.error("Error fetching documents ", error);

    }
  }
  
  addToCart() {
    alert("hello")
    }
}
