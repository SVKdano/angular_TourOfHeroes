import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HEROES } from "../mock-heroes";
import { Hero } from "../hero";
import { MessagesService } from "./messages.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //url to web api
  private heroesUrl = "api/heroes";

  constructor(private messageService: MessagesService, private http: HttpClient) { }


  //get heroes from server
  getHeroes(): Observable<Hero[]> {
    // this gets it from mock
    //const heroes = of(HEROES);
    //this.messageService.add("HeroService: Fetched heroes")
    //return heroes;

    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes from http")),
        catchError(this.handleError<Hero[]>("getHeroes", []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    //const hero = HEROES.find(h => h.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(hero);

    const url = "${this.heroesUrl}/${id}";
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log("fetched hero id = ${id}")),
        catchError(this.handleError<Hero>("getHero id=${id}"))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

