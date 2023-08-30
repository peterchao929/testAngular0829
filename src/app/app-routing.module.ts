import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  // 新增一段預設路由，讓網站導向dashboard，未設定則會導向根目錄
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 儀表板 路由
  { path: 'dashboard', component: DashboardComponent },
  // 英雄清單 路由
  { path: 'heroes', component: HeroesComponent },
  // 加入英雄詳情路由
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
