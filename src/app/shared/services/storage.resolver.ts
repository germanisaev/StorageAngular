import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { StorageService } from "./storage.service";
import { Observable, catchError, map, of, retry, take, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class StorageResolver implements Resolve<Storage> {
    
    private REST_API_SERVER: string = environment.apiUrl;

    constructor(private _service: StorageService,
                private router: Router,
                private http: HttpClient) {
    }

    handleError(error: any) {
        this.router.navigateByUrl('/404');
        return throwError(error);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        
        return this.http.get(`${this.REST_API_SERVER}/storage/all`).pipe(take(1));

    }
}