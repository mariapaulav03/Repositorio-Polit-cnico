import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';


const baseUrl = 'http://localhost:3000/api/v1/persons';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  create(data: Person): Observable<Person> {
    return this.http.post<Person>(baseUrl, data);
  }

  get(id: string): Observable<Person> {
    return this.http.get<Person>(`${baseUrl}/${id}`);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(baseUrl);
  }

  update(id: string, data: Person): Observable<Person> {
    return this.http.put<Person>(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
