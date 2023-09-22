import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService
  ) {}

  // 初始化時 自動抓取英雄清單
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getHeroes();
  }

  // 呼叫Service getHeroes方法/取得英雄清單
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      console.log(this.heroes);
    });
  }

  // 呼叫Service addHero(id)方法/新增英雄資料
  add(name: string): void {
    name = name.trim();

    if(!name) { return; }
    this.heroService.addHero({name} as Hero).subscribe(hero => { this.heroes.push(hero)});
  }

  // 呼叫Service deleteHero(id)方法/刪除英雄資料
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe;
  }
}
