import { AuctionInfo } from './auction-info.model';

export interface Auction {
  _id: string;
  name: string;
  gameId: number;
  vendorPrice: number;
  auctions: AuctionInfo[];
  __v: number;
  gameMedia?: string;
}
