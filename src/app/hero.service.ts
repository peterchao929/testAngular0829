import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService：${message}`)
  }

  // web api的url
  private heroesUrl = 'api/heroes';

  // 取得英雄清單
  getHeroes(): Observable<Hero[]> {
    // 原先寫死資料讀取方式
    //const heroes = of(HEROES);
    //this.messageService.add('英雄Service：配對英雄中');
    //return heroes;

    // 連接Web API方式 進度到這
    return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));

  }

  // 取的單一英雄資料
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`英雄Service：配對英雄id=${id}`);
    return of(hero);
  }
}
