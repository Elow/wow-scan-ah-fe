import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { AuctionItem } from 'src/app/models/auction-item.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  auctions$!: Observable<AuctionItem[]>;
  private searchTerms = new Subject<string>();

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.auctions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.auctionService.searchAuctionsItems(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
