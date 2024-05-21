import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change',
  standalone: true,
  imports: [],
  templateUrl: './change.component.html',
  styleUrl: './change.component.css'
})
export class ChangeComponent implements OnInit {
  changeAmount: any = {}
  isButtonClicked: boolean = false;

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
      return confirm('Please confirm receipt to continue');
    }
    return true;
  }

}


 


