import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Auction } from '../models/auction.model';
import { AUCTIONS } from 'src/assets/mocks/auctions-items';
import { AUCTION_GANGREFER } from 'src/assets/mocks/auction-gangrefer';
import { AuctionItem } from '../models/auction-item.model';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private auctionsUrl = 'api/auctions';
  isMocked = true;

  constructor(private http: HttpClient) {}

  searchAuctionsItems(term: string): Observable<AuctionItem[]> {
    if (!term.trim()) {
      return of([]);
    }
    if (this.isMocked) {
      return of(AUCTIONS);
    } else {
      return this.http.get<AuctionItem[]>(`${this.auctionsUrl}/items/name/${term}`).pipe(
        tap((x) =>
          x.length ? console.log(`found auction matching "${term}"`) : console.log(`no auction matching "${term}"`)
        ),
        catchError(this.handleError<AuctionItem[]>('searchAuctionsItems', []))
      );
    }
  }

  getAuctionItems(): Observable<AuctionItem[]> {
    return of(AUCTIONS);
  }

  getAuction(id: number): Observable<Auction[]> {
    return of(AUCTION_GANGREFER);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
