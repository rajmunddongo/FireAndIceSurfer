/**
 * This component lists the characters, and if the user clicks on the next or
 * previous buttons, we display another set of characters. After the user clicks on
 * the name of a character, we display the character info.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/models/character.type';
import { CharacterService } from 'src/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

  /**
   * List of characters we display.
   */
  public Characters: Character[] = [];

  /**
   * The current page of characters.
   */
  public characterPage = 2;

  /**
   * Constructor
   * @param characterService - The service for obtaining characters.
   * @param router - Router for routing.
   */
  constructor(private characterService: CharacterService, private router: Router) { }

  /**
   * Obtains the 10 characters from the given characterpage.
   */
  ngOnInit(): void {
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data;
    });
  }

  /**
   * Loads the data from the next page, and shifts one page up.
   */
  nextHousePage(): void {
    this.characterPage++;
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data;
    });
  }

  /**
   *  Loads the data from the previous page, and shifts one page down.
   */
  previousHousePage(): void {
    if (this.characterPage != 2) {
      this.characterPage--;
    }
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data;
    });
  }

  /**
   * Navigates to the character info of a character with the given name.
   * @param name - The name of the character where we navigate.
   */
  goToCharacter(name: string): void {
    this.router.navigate(['/character'], { queryParams: { name: name } });
  }
}
