import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private usersCache: User[] = [];
  private userCache: Map<number, User> = new Map();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // Return cached users if available
    if (this.usersCache.length > 0) {
      return of(this.usersCache);
    }

    return this.http.get<User[]>(this.apiUrl).pipe(
      retry(2),
      tap(users => {
        this.usersCache = users;
        // Cache individual users too
        users.forEach(user => this.userCache.set(user.id, user));
      }),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    // Return cached user if available 
    if (this.userCache.has(id)) {
      return of(this.userCache.get(id)!);
    }

    // If not cached, fetch from API
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      tap(user => this.userCache.set(id, user)),
      catchError(this.handleError)
    );
  }

  getUniqueCities(users: User[]): string[] {
    const cities = users.map(user => user.address.city);
    return [...new Set(cities)].sort();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}