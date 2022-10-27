import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HEROES } from "./mock-heroes";
import { Hero} from "./hero";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

}

