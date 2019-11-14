import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BodyResponse, Estudiante } from './modelos';

@Injectable({
  providedIn: 'root'
})

export class AppService<T> {
  baseurl = "/eps-app/rest/";
  name = "name"

  constructor(
    private http: HttpClient
  ) { }

  controller_url(id : any = "") {
    const self = this;
    return self.baseurl + self.name + "/" + id
  }

  sel(params?) {
    const self = this;
    return self.http.get<BodyResponse<T[]>>(self.controller_url(), { params }).toPromise();
  }

  create(data: T, params?) {
    const self = this;
    return this.http.post<BodyResponse<T>>(self.controller_url(), data, { params }).toPromise();
  }

  del(id: number) {
    const self = this;
    return this.http.delete<BodyResponse<T>>(self.controller_url(id)).toPromise();
  }

  upt(id: number, data: T, params?) {
    const self = this;
    return this.http.put<BodyResponse<T>>(self.controller_url(id), data, { params }).toPromise();
  }

  get(id: Number) {
    const self = this;
    return self.http.get<BodyResponse<T>>(self.controller_url(id)).toPromise();
  }
}

