import { Injectable } from '@angular/core';

@Injectable()
export class ShareService {

  list = [
    'First',
    'Second'
  ];

  constructor() { }

  add(val) {
    this.list.push(val);
  }

}
