import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuctionItem } from 'src/app/models/auction-item.model';
import { LocalStorageRefService } from 'src/app/services/local-storage-ref.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  favorites$: Observable<AuctionItem[]>;

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this.favorites$ = _localStorageRefService.favorites$;
    _localStorageRefService.loadFavorites();
  }

  deleteFavorite(favorite: AuctionItem) {
    this._localStorageRefService.removeFavorite(favorite);
  }
}
