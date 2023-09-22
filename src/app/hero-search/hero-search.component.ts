import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 待字串變化的事件停止150毫秒後，才會發送請求
      debounceTime(150),
      // 用於確保搜尋條件變化(也就是搜尋輸入框內的文字有變化)才會傳送請求給伺服器
      distinctUntilChanged(),
      // 從經過上兩項觸發的請求中，只返回最近一次將其餘請求取消及捨棄，避免海量HTTP請求浪費伺服器資源
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
