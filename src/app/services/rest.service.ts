import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getAPIData(url: string) {
    return this.http.get(url, {}).pipe(
      catchError((error: any) => {
        return throwError(error);
      }));
  }

}
