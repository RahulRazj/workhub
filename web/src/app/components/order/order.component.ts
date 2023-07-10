import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  orderObject: { [k: string]: any } = {
    breakfast: {
      type: 'checkbox',
      options: ['Veg'],
    },
    lunch: {
      type: 'checkbox',
      options: ['Veg', 'Non-Veg'],
    },
  };

  orderKeys: string[] = ['breakfast', 'lunch'];

  onOrder(form: NgForm) {
    const formData = form.value;

    let orders: { [k: string]: any } = {};

    Object.keys(formData).forEach((order) => {
      let [day, time, ...option] = order.split('-');
      const selected = option.join('-');
      orders[day] = {
        ...orders[day],
        ...(formData[order] && { [time]: selected }),
      };
    });

    const localUserInfo = JSON.parse(
      localStorage.getItem('userDetails') || '{}'
    );

    const localOrders = JSON.parse(localStorage.getItem('localOrders') || `[]`);

    const localOrderObject = {
      userId: localUserInfo.user.userId,
      date: new Date(),
      order: orders,
    };

    localOrders.push(localOrderObject);

    localStorage.setItem('localOrders', JSON.stringify(localOrders));
  }
}
