import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  dealsData: any[] = [];
  to_do: any[] = [];
  in_progress: any[] = [];
  done: any[] = [];
  offer_sent: any[] = [];
  getting_ready: any[] = [];
  currentDate: any;
  term:string='';
  deleteCardShow:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.getData()
    this.currentDate = new Date();
  }

  // getData() {
  //   this._salesService.getDeals().subscribe({
  //     next: (res) => {
  //       this.dealsData = res.deals;
  //       this.filterData()
  //     }
  //   })
  // }
  filterData() {
    if (this.dealsData) {
      for (let i = 0; i < this.dealsData.length; i++) {
        if (this.dealsData[i].status == 'Potential Value') {
          this.potential_value.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Focus') {
          this.focus.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Contact Made') {
          this.contact_made.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Offer Sent') {
          this.offer_sent.push(this.dealsData[i])
        }
        else if (this.dealsData[i].status == 'Getting Ready') {
          this.getting_ready.push(this.dealsData[i])
        }
      }
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    this.term=' ';
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.hideDeleteCard();
      this.refreshSearch();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.hideDeleteCard();
      this.refreshSearch()
    }
  }
  refreshSearch(){
      this.term='';
  }
  isFutureDate(idate: any) {
    var today = new Date().getTime(),
      idate = idate.split("/");
    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    return (today - idate) < 0 ? true : false;
  }
  showDeleteCard()
  {
    this.deleteCardShow=true;
  }
  hideDeleteCard()
  {
    this.deleteCardShow=false;

  }
}
