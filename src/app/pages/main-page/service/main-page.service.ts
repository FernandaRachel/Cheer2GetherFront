import { Injectable } from '@angular/core';
import * as url from '../../../../assets/urls';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MainPageService {

  constructor(private _httpClient: HttpClient) {

  }

  public getNews(): Observable<any> {
    return this._httpClient.get(url.urls.news);
  }

  public getGroups(): Observable<any> {
    return this._httpClient.get(url.urls.group);
  }
}
