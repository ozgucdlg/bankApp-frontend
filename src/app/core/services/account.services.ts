// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Account, Transaction } from '../models/account.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `${environment.apiUrl}/accounts`;
  private transactionUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) { }

  // Get current user's account
  getCurrentUserAccount(): Observable<Account> {
    console.log('Account Service - Fetching current user account');
    return this.http.get<Account>(`${this.baseUrl}/current`).pipe(
      tap(account => {
        console.log('Account Service - Received account data:', account);
      }),
      catchError(error => {
        console.error('Account Service - Error fetching current account:', error);
        throw error;
      })
    );
  }

  // Get account details
  getAccount(id: number): Observable<Account> {
    console.log(`Account Service - Fetching account details for ID: ${id}`);
    return this.http.get<Account>(`${this.baseUrl}/${id}`).pipe(
      tap(account => {
        console.log('Account Service - Received account details:', account);
      }),
      catchError(error => {
        console.error('Account Service - Error fetching account details:', error);
        throw error;
      })
    );
  }

  // Deposit money
  deposit(id: number, amount: number): Observable<Account> {
    console.log(`Account Service - Making deposit: ${amount} to account ${id}`);
    return this.http.post<Account>(`${this.baseUrl}/${id}/deposit`, { amount }).pipe(
      tap(account => {
        console.log('Account Service - Deposit successful:', account);
      }),
      catchError(error => {
        console.error('Account Service - Error making deposit:', error);
        throw error;
      })
    );
  }

  // Withdraw money
  withdraw(id: number, amount: number): Observable<Account> {
    console.log(`Account Service - Making withdrawal: ${amount} from account ${id}`);
    return this.http.post<Account>(`${this.baseUrl}/${id}/withdraw`, { amount }).pipe(
      tap(account => {
        console.log('Account Service - Withdrawal successful:', account);
      }),
      catchError(error => {
        console.error('Account Service - Error making withdrawal:', error);
        throw error;
      })
    );
  }

  // Transfer money
  transfer(fromAccountId: number, toAccountId: number, amount: number, description: string): Observable<Transaction> {
    console.log(`Account Service - Making transfer: ${amount} from account ${fromAccountId} to ${toAccountId}`);
    return this.http.post<Transaction>(`${this.transactionUrl}/transfer`, {
      fromAccountId,
      toAccountId,
      amount,
      description
    }).pipe(
      tap(transaction => {
        console.log('Account Service - Transfer successful:', transaction);
      }),
      catchError(error => {
        console.error('Account Service - Error making transfer:', error);
        throw error;
      })
    );
  }

  // Get account transactions
  getAccountTransactions(accountId: number): Observable<Transaction[]> {
    console.log(`Account Service - Fetching transactions for account ${accountId}`);
    return this.http.get<Transaction[]>(`${this.transactionUrl}/account/${accountId}`).pipe(
      tap(transactions => {
        console.log('Account Service - Received transactions:', transactions);
      }),
      catchError(error => {
        console.error('Account Service - Error fetching transactions:', error);
        throw error;
      })
    );
  }
}