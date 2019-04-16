import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items = [
    {
      name: "Milk",
      quantity: "1"
    },
    {
      name: "Eggs",
      quantity: "Dozen"
    },
    {
      name: "Orange Juice",
      quantity: "1"
    },
    {
      name: "Avacado",
      quantity: "3"
    },
  ];

  constructor() {
    console.log('Hello Groceries')
   }

   getItems() {
    return this.items;
   }

   removeItem(index) {
     this.items.splice(index, 1);
   }

   addItem(item) {
     this.items.push(item);
   }

   editItem(item, index){
     this.items[index] = item;
   }
}
