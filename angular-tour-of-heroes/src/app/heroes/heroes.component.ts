import { Component, OnInit } from '@angular/core';

import { Hero } from "../hero";
import { HeroService } from "../services/hero.service";
import { MessagesService } from "../services/messages.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
 heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessagesService) { }

  ngOnInit(): void {
   this.getHeroes();
  }

  getHeroes() : void {
   this.heroService.getHeroes()
     .subscribe(heroes => this.heroes = heroes );
  }
}
