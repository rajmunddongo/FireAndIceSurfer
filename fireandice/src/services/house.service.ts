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

    /**
     * Get houses with path
     * @param path Path
     * @returns houses
     */
    getHouses(path:String): Observable<House[]> {
        return this.http.get<House[]>('https://www.anapioficeandfire.com/api/houses'+path);
    }

    /**
     * Get overlord from given api endpoint.
     * @param url 
     * @returns overlord
     */
    getOverLord(url: string) {
        return this.http.get<Character>(url);
    }

    /**
     * Get houses with given name.
     * @param name 
     * @returns house objects
     */
    getHouse(name:string | null): Observable<House[]>{
        return this.http.get<House[]>("https://www.anapioficeandfire.com/api/houses?name="+name);
    }

    /**
     * Get house from given endpoint
     * @param path 
     * @returns house
     */
    getHouseFromString(path:string): Observable<House>{
        return this.http.get<House>(path);
    }
}