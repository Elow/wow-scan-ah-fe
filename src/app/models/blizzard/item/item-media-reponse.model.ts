import { ItemMediaAsset } from './item-media-asset.model';

export interface ItemMediaResponse {
  id: string;
  _links: { self: { href: string } };
  assets: ItemMediaAsset[];
}
