import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/services/auction.service';
import { AuctionItem } from 'src/app/models/auction-item.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StoriesService } from 'src/app/services/api/stories.service';
import { Story } from 'src/app/models/stories/story.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  auctions$!: Observable<AuctionItem[]>;
  story$: Observable<Story[]> = this.storieService.getStories();
  private searchTerms = new Subject<string>();

  constructor(private auctionService: AuctionService, private storieService: StoriesService) {}

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
