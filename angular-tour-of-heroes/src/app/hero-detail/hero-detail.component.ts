import { Component, OnInit , Input } from '@angular/core';
import { Hero } from "../hero";
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    //contains info about actual route (URL)
    private route: ActivatedRoute,
    //let me navigate back
    private location: Location,
    //contains heroes
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
}
