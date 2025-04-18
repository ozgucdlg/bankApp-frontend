import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor - Original request URL:', request.url);
    
    // Skip auth header for login request
    if (request.url.includes('/auth/login')) {
      console.log('AuthInterceptor - Skipping auth header for login request');
      return next.handle(request);
    }

    const currentUser = this.authService.currentUserValue;
    console.log('AuthInterceptor - Current user:', 
      currentUser ? { ...currentUser, token: 'HIDDEN' } : null
    );
    
    if (currentUser && currentUser.token) {
      console.log('AuthInterceptor - Adding token to request');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      console.log('AuthInterceptor - Final request headers:', request.headers.keys());
    } else {
      console.log('AuthInterceptor - No token available');
    }
    
    return next.handle(request);
  }
} 