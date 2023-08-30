import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Alice1' },
      { id: 13, name: 'Ban1' },
      { id: 14, name: 'Cindy1' },
      { id: 15, name: 'David1' },
      { id: 16, name: 'Ella1' },
      { id: 17, name: 'FucO1' },
      { id: 18, name: 'Galaxy1' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
