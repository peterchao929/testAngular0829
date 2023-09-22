import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Alice' },
      { id: 13, name: 'UGO' },
      { id: 14, name: 'Kirito' },
      { id: 15, name: 'David' },
      { id: 16, name: 'Ella' },
      { id: 17, name: 'FucO' },
      { id: 18, name: 'Galaxy' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
