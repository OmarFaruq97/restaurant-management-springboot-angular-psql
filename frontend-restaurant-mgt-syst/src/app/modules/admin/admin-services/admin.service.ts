import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth-services/storage-service/storage.service';
const BASIC_URL = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(private http: HttpClient ) { }

  postCategory(categoryDto: any): Observable<any>{
    console.log(this.createAuthorizatoinHeader())
    return this.http.post<[]>(BASIC_URL + "api/admin/category", categoryDto,{
      headers : this.createAuthorizatoinHeader()
    })
  }

  postCategories(): Observable<any>{
    console.log(this.createAuthorizatoinHeader())
    return this.http.post<[]>(BASIC_URL + "api/admin/category", {
      headers : this.createAuthorizatoinHeader()
    })
  }

  createAuthorizatoinHeader():HttpHeaders{
    let authHeaders : HttpHeaders = new HttpHeaders();
    return authHeaders.set("Authorization", "Bearer" + StorageService.getToken())
  }
}
