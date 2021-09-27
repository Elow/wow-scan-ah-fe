import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMediaResponse } from '../models/blizzard/item/item-media-reponse.model';

@Injectable({
  providedIn: 'root',
})
export class BlizzardService {
  baseUrl = 'https://eu.api.blizzard.com/data/wow/';
  itemMediaUrl = this.baseUrl + 'media/item/';
  namespace = 'namespace=static-classic-eu';
  locale = 'locale=fr_FR';
  accessToken = 'access_token=USrF76dSwYwTlrJjCNy7BDMzWNhyFgwtLm';
  paramsUrl = '?' + this.namespace + '&' + this.locale + '&' + this.accessToken;

  constructor(private httpClient: HttpClient) {}

  getItemMedia(itemId: number): Observable<ItemMediaResponse> {
    return this.httpClient.get<ItemMediaResponse>(this.itemMediaUrl + itemId + this.paramsUrl);
  }
}
