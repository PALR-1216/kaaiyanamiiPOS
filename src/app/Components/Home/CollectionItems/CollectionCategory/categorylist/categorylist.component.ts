import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-categorylist',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
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
  
    this._route.params.subscribe(params => { // make sure 'collectionName' matches the route parameter
      console.log("new route", params["collectionName"])
      this.getCategoryItems(params["collectionName"]);
    });

  }

  async getCategoryItems(collectionName:any) {
    try {
      this.allItems = []
      let ref = collection(this._firestore, "Items");
      let q = query(ref, where("collectionName", "==", collectionName));
      let snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        this.allItems.push(doc.data());
      })
    } catch (error) {
      console.error("Error fetching documents ", error);

    }
  }
  
  addToCart() {
    console.log("hello world")
    }
}
