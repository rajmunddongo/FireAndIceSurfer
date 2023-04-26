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
export class HouseService {
    constructor(private http: HttpClient) { }

    getHouses(path:String): Observable<House[]> {
        return this.http.get<House[]>('https://www.anapioficeandfire.com/api/houses'+path);
    }
    getOverLord(url: string) {
        return this.http.get<Character>(url);
    }
    getHouse(id:string | null): Observable<House>{
        return this.http.get<House>("https://www.anapioficeandfire.com/api/houses/"+id);
    }
    getHouseFromString(path:string): Observable<House>{
        return this.http.get<House>(path);
    }
}