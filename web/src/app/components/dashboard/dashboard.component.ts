import { Component, OnInit } from '@angular/core';

interface localOrder {
  userId: string;
  date: Date;
  orders: {};
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orders: any[] = [];
  ngOnInit(): void {
    
    const localUserInfo = JSON.parse(
      localStorage.getItem('userDetails') || '{}'
    );

    const localOrders = JSON.parse(localStorage.getItem('localOrders') || `[]`);

    if (localOrders.length > 0) {
      const userOrder = localOrders.filter(
        (u: localOrder) => u.userId === localUserInfo.user.userId
      );
      this.orders = userOrder;
      this.orders.map((o: { [k: string]: any }) => {
        o['date'] = new Date(o['date']);
        let day = [];
        for (let key of Object.keys(o['order'])) {
          day.push({ ...o['order'][key], dayName: key });
        }
        o['order'] = day;
      });
    }
  }
}
