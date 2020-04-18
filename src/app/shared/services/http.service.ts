import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  public constructor(
    private _httpClient: HttpClient,
  ) {}

  public get(url) {
    return this._httpClient.get(`${API_URL}${url}`);
  }

  public post(url, data) {
    return this._httpClient.post(`${API_URL}${url}`, data);
  }
}
