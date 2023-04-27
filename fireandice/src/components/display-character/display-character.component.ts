/**
 * This component is for displaying the info of one character.
 */
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
  /**
   * The character to display.
   */
  public character !: Character;
    /**
   * Constructor
   * @param {CharacterService} characterService - Service to obtain characters.
   * @param {BookService} bookService - Service to obtain books.
   * @param {ActivatedRoute} route - Route to obtain path param value.
   * @param {Router} router - Router to navigate.
   * @param {HouseService} houseService - House service to obtain houses.
   */
  constructor(
    private characterService: CharacterService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private houseService:HouseService
  ) {}

  /**
   * Load data for character.
   */
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

  /**
   * Load shown characters for the character.
   */
  loadSwornCharacters() {
    if (!this.character.allegiances) {
      return;
    }
    let characterObservables = this.character.allegiances.map(url => this.houseService.getHouseFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.character.allegianceHouses = characters.map(character => character);
    });
  }

  /**
   * Load Father character for the character.
   */
  loadFatherCharacter() {
    if (!this.character.father) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.father);
    characterObservable.subscribe(character => {
      this.character.fatherCharacter = character;
    });
  }

    /**
   * Load Mother character for the character.
   */
  loadMotherCharacter() {
    if (!this.character.mother) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.mother);
    characterObservable.subscribe(character => {
      this.character.motherCharacter = character;
    });
  }

    /**
   * Load Spouse character for the character.
   */
  loadSpouseharacter() {
    if (!this.character.spouse) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.character.spouse);
    characterObservable.subscribe(character => {
      this.character.spouseCharacter = character;
    });
  }

  /**
   * Redirect to the info page of the character with the given name.
   * @param characterName - Name of the character where we navigate
   */
  redirectToCharacterPage(characterName: string): void {
    if (characterName) {
      this.router.navigate(['/character'], { queryParams: { name: characterName } }).then(() => {
        window.location.reload();
      });
    }
  }

  /**
   * Redirect to the house info page of the house with the given name.
   * @param houseName - Name of the house where we want to navigate.
   */
  redirectToHousePage(houseName: string): void {
    if (houseName) {
      this.router.navigate(['/house'], { queryParams: { name: houseName } });
    }
  }

  /**
   * Redirect to the book info page with the selected name.
   * @param bookName The name of the book where we navigate to.
   */
  redirectToBookPage(bookName: string): void {
    if (bookName) {
      this.router.navigate(['/book'], { queryParams: { name: bookName } });
    }
  }
}
