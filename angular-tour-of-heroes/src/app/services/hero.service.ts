import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HEROES } from "../mock-heroes";
import { Hero} from "../hero";
import { MessagesService} from "./messages.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessagesService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("HeroService: Fetched heroes")
    return heroes;
  }

}

