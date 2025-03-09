import { Component, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Hero, HeroService } from '@nx-20-ng-19/shared';

@Component({
  selector: 'app-heroes',
  imports: [RouterLink],
  styleUrls: ['./heroes.component.css'],
  template: `
    <h2>My Heroes</h2>

    <div>
      <label for="new-hero">Hero name: </label>
      <input id="new-hero" #heroName />

      <!-- (click) passes input value to add() and then clears the input -->
      <button type="button" class="add-button" (click)="add(heroName.value); heroName.value=''">
        Add hero
      </button>
    </div>

    <ul class="heroes">
      @for (hero of heroes; track hero) {
        <li>
          <a routerLink="/detail/{{hero.id}}">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
          </a>
          <button type="button" class="delete" title="delete hero"
                  (click)="delete(hero)">x</button>
        </li>
      }
    </ul>
  `
})
export class HeroesComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
