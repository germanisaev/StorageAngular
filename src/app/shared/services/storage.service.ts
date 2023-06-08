import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageModel } from '../models/storageModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private REST_API_SERVER: string = environment.apiUrl; 
  log: any;
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    })
  };
  constructor(private http: HttpClient) { }

  GetAllStorage(): Observable<StorageModel[]> {
    return this.http.get<StorageModel[]>(`${this.REST_API_SERVER}/storage/all`).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  GetStorageBy(storageId: string): Observable<StorageModel> {
    return this.http.get<StorageModel>(`${this.REST_API_SERVER}/storage/${storageId}`).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
