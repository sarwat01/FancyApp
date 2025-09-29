import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-check-fib-payment',
  templateUrl: './check-fib-payment.component.html',
  styleUrls: ['./check-fib-payment.component.css']
})
export class CheckFibPaymentComponent implements OnInit {


  currentPage: number = 1;
itemsPerPage: number = 10;
totalItems: number = 0;
totalPages: number = 0;
visiblePages: number[] = [];


 data: any[] = [];
  search: string = '';
  statusFilter: string = '';
  cardStatusFilter: string = '';
  sortBy: string = 'createdAt';
  order: string = 'desc';
  limit: number = 20;
  skip: number = 0; 
  uniqueStatuses: string[] = [];
  uniqueCardStatuses: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

 fetchData() {
  let params = new HttpParams()
    .set('limit', this.limit.toString())
    .set('skip', ((this.currentPage - 1) * this.limit).toString())
    .set('order', this.order)
    .set('sortBy', this.sortBy);

  if (this.search) {
    params = params.set('search', this.search);
  }

  if (this.statusFilter) {
    params = params.set('status', this.statusFilter); // 💡 pass to backend
  }

  if (this.cardStatusFilter) {
    params = params.set('CardStatus', this.cardStatusFilter); // 💡 pass to backend
  }

  const url = 'http://127.0.0.1:1995/api/v1/localpayments';

  this.http.get<any>(url, { params }).subscribe((res) => {
    // Assuming your backend response structure is like:
    // { data: [...], total: number }

    this.data = res.data || res;
    this.totalItems = res.total || this.data.length;
    this.totalPages = Math.ceil(this.totalItems / this.limit);

    this.updateVisiblePages();
  });
}


  sortByField(field: string) {
    if (this.sortBy === field) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.order = 'asc';
    }
    this.fetchData();
  }

  nextPage() {
    this.skip += this.limit;
    this.fetchData();
  }

  prevPage() {
    if (this.skip > 0) {
      this.skip -= this.limit;
      this.fetchData();
    }
  }

 getStatusClass(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-warning text-dark font-weight-bold';
    case 'success':
      return 'bg-success text-white font-weight-bold';
  
    default:
      return '';
  }
}

getCardStatusClass(CardStatus: string): string {
  switch (CardStatus) {
    case 'PAID':
      return 'bg-success text-white font-weight-bold';
    case 'UNPAID':
      return 'bg-warning text-white font-weight-bold';
    case 'DECLINED':
      return 'bg-danger text-white font-weight-bold';
    default:
      return '';
  }
}



// Display only current page items
updateVisibleData() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  this.data = this.data.slice(start, end);
}
 

 
goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.fetchData();
  }
}

goToPrevPageBlock() {
  const prevPage = Math.max(1, this.visiblePages[0] - 1);
  this.goToPage(prevPage);
}

goToNextPageBlock() {
  const nextPage = Math.min(this.totalPages, this.visiblePages[this.visiblePages.length - 1] + 1);
  this.goToPage(nextPage);
}

updateVisiblePages() {
  const blockSize = 5;
  const currentBlock = Math.floor((this.currentPage - 1) / blockSize);
  const start = currentBlock * blockSize + 1;
  const end = Math.min(start + blockSize - 1, this.totalPages);

  this.visiblePages = [];
  for (let i = start; i <= end; i++) {
    this.visiblePages.push(i);
  }
}

}