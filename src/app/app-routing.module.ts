import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auction-detail/:id', component: AuctionDetailComponent },
  { path: 'favorites', component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
