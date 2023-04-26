import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Book } from "src/models/book.type";
import { Observable } from "rxjs";
import { HttpHandler } from "@angular/common/http";
import { House } from "src/models/house.type";
import { Character } from "src/models/character.type";

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    constructor(private http: HttpClient) { }

    getHouses(path:String): Observable<Character[]> {
        return this.http.get<Character[]>('https://www.anapioficeandfire.com/api/characters'+path);
    }

    getCharacter(name:string | null): Observable<Character[]>{
        return this.http.get<Character[]>("https://www.anapioficeandfire.com/api/characters?name="+name);
    }

    getCharacterFromString(id:string): Observable<Character>{
        return this.http.get<Character>(id);
    }
}