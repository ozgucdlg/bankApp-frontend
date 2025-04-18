import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { User } from '../models/user.model';
import { Account } from '../models/account.model';
import { AccountService } from './account.services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private currentAccountSubject: BehaviorSubject<Account | null>;
  public currentAccount: Observable<Account | null>;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    this.currentAccountSubject = new BehaviorSubject<Account | null>(
      JSON.parse(localStorage.getItem('currentAccount') || 'null')
    );
    this.currentAccount = this.currentAccountSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get currentAccountValue(): Account | null {
    return this.currentAccountSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    console.log('Auth Service - Starting login request for user:', username);
    
    // Create URL parameters
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    console.log('Auth Service - Making login request to:', `${environment.apiUrl}/auth/login`);
    
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`,
      null,  // no body needed
      { params }  // send as URL parameters
    ).pipe(
      tap(response => {
        console.log('Auth Service - Raw login response:', response);
        console.log('Auth Service - Response type:', typeof response);
        
        try {
          const data = typeof response === 'string' ? JSON.parse(response) : response;
          console.log('Auth Service - Parsed response data:', {
            ...data,
            token: data.token ? 'HIDDEN' : undefined,
            access_token: data.access_token ? 'HIDDEN' : undefined,
            jwt: data.jwt ? 'HIDDEN' : undefined
          });
          
          // Store the raw response in localStorage for debugging
          const debugResponse = { ...data };
          if (debugResponse.token) debugResponse.token = 'HIDDEN';
          if (debugResponse.access_token) debugResponse.access_token = 'HIDDEN';
          if (debugResponse.jwt) debugResponse.jwt = 'HIDDEN';
          localStorage.setItem('lastLoginResponse', JSON.stringify(debugResponse));
          
          // Create user object
          const user: User = {
            id: data.id || data.userId || 1,
            firstName: data.firstName || data.name || username,
            lastName: data.lastName || '',
            email: data.email || username,
            token: data.token || data.access_token || data.jwt || data
          };
          
          // Ensure token is a string
          if (typeof user.token !== 'string') {
            user.token = JSON.stringify(user.token);
          }
          
          console.log('Auth Service - Created user object:', {
            ...user,
            token: 'HIDDEN'
          });
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log('Auth Service - Stored user in localStorage');
          
          this.currentUserSubject.next(user);
          console.log('Auth Service - Updated currentUserSubject');

          // If we have account data directly in the response
          if (data.account) {
            console.log('Auth Service - Account data found in response:', data.account);
            const account: Account = {
              id: data.account.id,
              accountHolderName: data.account.accountHolderName || `${user.firstName} ${user.lastName}`,
              balance: data.account.balance || 0
            };
            localStorage.setItem('currentAccount', JSON.stringify(account));
            this.currentAccountSubject.next(account);
          } 
          // If we need to fetch account data separately
          else {
            console.log('Auth Service - No account data in response, fetching from accounts/current endpoint...');
            // Try to fetch account data
            this.accountService.getCurrentUserAccount().subscribe({
              next: (account) => {
                console.log('Auth Service - Successfully fetched account data:', account);
                if (account) {
                  localStorage.setItem('currentAccount', JSON.stringify(account));
                  this.currentAccountSubject.next(account);
                }
              },
              error: (error) => {
                console.error('Auth Service - Error fetching account data:', error);
                if (error.status === 401) {
                  console.error('Auth Service - Unauthorized error. Token might be invalid or missing.');
                }
              }
            });
          }
        } catch (error) {
          console.error('Auth Service - Error processing login response:', error);
          throw error;
        }
      }),
      catchError(error => {
        console.error('Auth Service - Login request error:', error);
        return throwError(() => error);
      })
    );
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(
      `${environment.apiUrl}/auth/register`, 
      user,
      { headers }
    ).pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAccount');
    this.currentUserSubject.next(null);
    this.currentAccountSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.token;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Bad request';
      } else if (error.status === 404) {
        errorMessage = 'Service not found';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to the server. Please check if the backend is running.';
      } else {
        errorMessage = error.error?.message || 'Server error';
      }
    }
    
    console.error('Auth service error:', error);
    return throwError(() => ({ message: errorMessage }));
  }
} 