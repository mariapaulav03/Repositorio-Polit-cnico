import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../model/person';
import { LoginRequest } from '../model/login-request.model';
import { LoginResponse } from '../model/login-response.model';

const baseUrl = 'http://localhost:3000/api/v1/persons';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  create(data: Person): Observable<Person> {
    return this.http.post<Person>(baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  get(id: string): Observable<Person> {
    return this.http.get<Person>(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  update(id: string, data: Person): Observable<Person> {
    return this.http.put<Person>(`${baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${baseUrl}/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }
}
