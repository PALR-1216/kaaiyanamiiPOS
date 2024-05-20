import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit{

  private _firestore = inject(Firestore);
  public collectionList:any[] = [];


  async ngOnInit() {
    


    try {
      this.getCollections();

    } catch (error) {
    }
  }

  async getCollections():Promise<void> {
    try {
      let ref = collection(this._firestore, "Collections");
      let snapshot = await getDocs(ref);
      snapshot.docs.forEach((doc) => {
        // console.log("Data: ", doc.data());
        this.collectionList.push(doc.data())
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
}
