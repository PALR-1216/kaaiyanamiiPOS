import { Component } from '@angular/core';
import { CollectionsComponent } from "../../CollectionItems/collections/collections.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CollectionsComponent]
})
export class HomeComponent {

}
