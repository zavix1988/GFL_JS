import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {
  productsArr = [
    {
      id: 1,
      name: 'esp32',
      price: 5,
      count: 0,
    },
    {
      id: 2,
      name: 'esp8266',
      price: 2,
      count: 0,
    },
    {
      id: 3,
      name: 'arduino nano',
      price: 4,
      count: 0,
    },
    {
      id: 4,
      name: 'Raspberry Pi3',
      price: 50,
      count: 0,
    },
    {
      id: 5,
      name: 'OrangePi + 2e',
      price: 54,
      count: 0,
    },
    {
      id: 6,
      name: 'Heltec LoRa 32',
      price: 7,
      count: 0,
    },
  ];
  products = JSON.parse(localStorage.ngShop || JSON.stringify(this.productsArr));
  
  constructor() {
    
  }

}
