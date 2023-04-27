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

    /**
     * Obtain houses with given path
     * @param path Path
     * @returns characters
     */
    getHouses(path:String): Observable<Character[]> {
        return this.http.get<Character[]>('https://www.anapioficeandfire.com/api/characters'+path);
    }


    /**
     * Get characters with the given name
     * @param name name of the characters
     * @returns characters
     */
    getCharacter(name:string | null): Observable<Character[]>{
        return this.http.get<Character[]>("https://www.anapioficeandfire.com/api/characters?name="+name);
    }

    /**
     * Get character from URLí
     * @param id url where we get the characeter form
     * @returns character
     */
    getCharacterFromString(id:string): Observable<Character>{
        return this.http.get<Character>(id);
    }
}