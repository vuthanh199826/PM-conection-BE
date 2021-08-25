import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL);
  }
  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${API_URL}/get/${id}`);
  }
  create(product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + '/create', product);
  }
  delete(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${API_URL}/delete/${id}`);
  }
  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${API_URL}/edit`, product);
  }
}
