import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) { }

  post(apiEndPoint: string, data: any) {
    return this.http.post<any>(this.url + apiEndPoint, data);
  }

  get(apiEndPoint: string) {
    return this.http.get<any>(this.url + apiEndPoint);
  }

  getById(apiEndPoint: string, id: number | string, queryParams?: any) {
    return this.http.get<any>(this.url + `${apiEndPoint}/${id}`,{params:queryParams});
  }

  getSearchData(apiEndPoint: string, data: any,) {
    return this.http.post<any>(this.url + `${apiEndPoint}`, data);
  }
}
