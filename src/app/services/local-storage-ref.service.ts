import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuctionItem } from '../models/auction-item.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageRefService {
  private _favorites$ = new BehaviorSubject<AuctionItem[]>([]);
  public favorites$ = this._favorites$.asObservable();

  get localStorage(): Storage {
    return this.getLocalStorage();
  }

  loadFavorites(): void {
    const data: AuctionItem[] = this.getFavorites();
    this._favorites$.next(data);
  }

  isItemFavorite(itemId: number) {
    return this.getFavorites().some((favorite) => {
      return favorite.id === itemId;
    });
  }

  saveFavorite(favorite: AuctionItem): void {
    let favoritesValue = this._favorites$.value;
    if (!favoritesValue) {
      favoritesValue = [];
    }
    favoritesValue.push(favorite);
    this.saveFavorites(favoritesValue);
  }

  removeFavorite(favorite: AuctionItem): void {
    const index = this._favorites$.value.indexOf(favorite, 0);
    if (index > -1) {
      this._favorites$.value.splice(index, 1);
    }
    this.saveFavorites(this._favorites$.value);
  }

  private saveFavorites(favorites: AuctionItem[]): void {
    this.localStorage.setItem('favorites', JSON.stringify(favorites));
    this.loadFavorites();
  }

  private getLocalStorage(): Storage {
    return localStorage;
  }

  private getFavorites(): AuctionItem[] {
    return JSON.parse(this.localStorage.getItem('favorites') || 'null');
  }
}
