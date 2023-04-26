import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Character } from 'src/models/character.type';
import { BookService } from 'src/services/book.service';
import { CharacterService } from 'src/services/characters.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-display-character',
  templateUrl: './display-character.component.html',
  styleUrls: ['./display-character.component.scss']
})
export class DisplayCharacterComponent {
  public character !: Character;
  constructor(private characterService: CharacterService, private bookService: BookService, private route: ActivatedRoute, private router: Router,private houseService:HouseService) { }
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('name');
    this.characterService.getCharacter(index).subscribe(data => {
      this.character = data[0];
      const bookObservables = this.character.books.map(bookUrl => this.bookService.getBookFromString(bookUrl));
      forkJoin(bookObservables).subscribe(books => {
        this.character.bookNames = books.map(book => book.name);
      });
      this.loadFatherCharacter();
      this.loadMotherCharacter();
      this.loadSpouseharacter();
      this.loadSwornCharacters();
    });
  }

  loadSwornCharacters() {
    if (!this.character.allegiances) {
      return;
    }
    let characterObservables = this.character.allegiances.map(url => this.houseService.getHouseFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.character.allegianceHouses = characters.map(character => character);
    });
  }
  loadFatherCharacter() {
    if (!this.character.father) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.father);
    characterObservable.subscribe(character => {
      this.character.fatherCharacter = character;
    });
  }
  loadMotherCharacter() {
    if (!this.character.mother) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.mother);
    characterObservable.subscribe(character => {
      this.character.motherCharacter = character;
    });
  }

  loadSpouseharacter() {
    if (!this.character.spouse) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.spouse);
    characterObservable.subscribe(character => {
      this.character.spouseCharacter = character;
    });
  }

  redirectToCharacterPage(characterName: string): void {
    if (characterName) {
      this.router.navigate(['/character'], { queryParams: { name: characterName } }).then(() => {
        window.location.reload();
      });
    }
  }
  redirectToHousePage(houseName: string): void {
    if (houseName) {
      this.router.navigate(['/house'], { queryParams: { name: houseName } });
    }
  }
  redirectToBookPage(bookName: string): void {
    if (bookName) {
      this.router.navigate(['/book'], { queryParams: { name: bookName } });
    }
  }
}
