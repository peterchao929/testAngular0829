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
    this.messageService.add(`HeroService：${message}`);
  }

  // Web API的url
  private heroesUrl = 'api/heroes';

  // 定義Web API的標頭
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // 取得英雄清單 get
  getHeroes(): Observable<Hero[]> {
    // 原先資料寫死讀取方式
    //const heroes = of(HEROES);
    //this.messageService.add('英雄Service：配對英雄中');
    //return heroes;

    // 連接Web API方式
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('英雄配對中')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // 取得單一英雄資料 get
  getHero(id: number): Observable<Hero> {
    // 原先資料寫死讀取方式
    //const hero = HEROES.find((h) => h.id === id)!;
    //this.messageService.add(`英雄Service：配對英雄id=${id}`);
    //return of(hero);

    // 連接Web API方式
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`配對到的英雄ID=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // 更新對應ID英雄資料 put
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`ID${hero.id}更新Hero資料`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // 新增英雄資料 post
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) =>
        this.log(`新增英雄 id=${newHero.id}，name=${newHero.name}`)
      ),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // 刪除英雄資料 delete
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`刪除資料ID=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // 搜尋英雄資料 search
  searchHeroes(term: string): Observable<Hero[]> {
    // 如果無搜尋資料，則回傳空的陣列
    if (!term.trim()) {
      return of([]);
    }

    // 搜尋欄位有資料則進行搜尋
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x =>
        x.length
          ? this.log(`找到 "${term}" 的資料了`)
          : this.log(`英雄清單中沒有 "${term}" 的資料`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  // 對應錯誤發生時的處理函式
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
