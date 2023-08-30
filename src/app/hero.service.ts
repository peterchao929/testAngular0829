import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  constructor(private messageService: MessageService) {}

  // 取得英雄清單
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('英雄Service：配對英雄中');
    return heroes;
  }

  // 取的單一英雄資料
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`英雄Service：配對英雄id=${id}`);
    return of(hero);
  }
}
