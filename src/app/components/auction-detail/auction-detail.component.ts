import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auction } from 'src/app/models/auction.model';
import { AuctionService } from 'src/app/services/auction.service';
import { first } from 'rxjs/operators';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.scss'],
})
export class AuctionDetailComponent implements OnInit {
  auctionToDisplay!: Auction;
  datas: any[] = [];
  googleDatas: any[] = [];
  isInitialized = false;
  chart = {
    title: '',
    type: ChartType.CandlestickChart,
    data: this.googleDatas,
    columns: ['time', 'min', 'boxmin', 'boxmax', 'max'],
  };

  constructor(private route: ActivatedRoute, private auctionService: AuctionService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.auctionService
      .getAuction(id)
      .pipe(first())
      .subscribe((auction) => {
        console.log(auction);
        this.auctionToDisplay = auction[0];
        // this.blizzardService.getItemMedia(this.auctionToDisplay.gameId).subscribe((media) => {
        //   this.auctionToDisplay.gameMedia = media.assets[0].value;
        // });
        let tempData: { x: Date; y: number[] } = { x: new Date(), y: [] };
        this.auctionToDisplay.auctions.forEach((auctionInfo) => {
          tempData.x = new Date(auctionInfo.date);
          auctionInfo.data.forEach((data) => {
            for (let i = 0; i < data.quantity; i++) {
              tempData.y.push(data.unitPrice / 100 / 100);
            }
            tempData.y.sort((a, b) => {
              return a > b ? 1 : a < b ? -1 : 0;
            });
          });
          this.datas.push(Object.assign({}, tempData));
          tempData.y = [];
          tempData.x = new Date();
        });
        console.log(this.datas);
        this.datas.forEach((d: { x: Date; y: [] }) => {
          const max = Math.max(...d.y);
          const min = Math.min(...d.y);
          const p75 = this.getPercentile(d.y, 75);
          const p25 = this.getPercentile(d.y, 25);
          const p95 = this.getPercentile(d.y, 95);
          const p5 = this.getPercentile(d.y, 5);
          this.googleDatas.push([new Date(d.x), p25, min, p75, p95]);
        });
        console.log(this.googleDatas);

        this.isInitialized = true;
      });
  }

  private getPercentile(datas: any[], percentile: number): number {
    datas.sort();
    const index: number = Math.ceil((percentile / 100.0) * datas.length);
    return datas[index - 1];
  }
}
