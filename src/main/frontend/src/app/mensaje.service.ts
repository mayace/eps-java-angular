import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  list = []

  loading = false;

  constructor() { }

  create(data) {
    this.list.push(data);
    window.scrollTo(0, 0);
  }
  create_danger(text) {
    this.create({
      class: "is-danger"
      , text
    })
  }
  create_info(text) {
    this.create({
      class: "is-info"
      , text
    })
  }

  del(index) {
    this.list.splice(index, 1);
  }

  create_from_http_response(error: HttpErrorResponse) {
    this.create_danger(error && error.message || error.statusText || error)
  }

}
