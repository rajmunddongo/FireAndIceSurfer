/**
 * This component is for displaying the data of a house.
 */
import { Component, KeyValueDiffers } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { House } from 'src/models/house.type';
import { BookService } from 'src/services/book.service';
import { CharacterService } from 'src/services/characters.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-display-house',
  templateUrl: './display-house.component.html',
  styleUrls: ['./display-house.component.scss']
})
export class DisplayHouseComponent {
  /**
   * This is the house we display
   */
  public house !: House;

  /**
   * Constructor
   * @param {Router} router - Router for routing.
   * @param {HouseService} houseService - Service to obtain houses.
   * @param {BookService} bookService - Service to obtain books.
   * @param {ActivatedRoute} route - Route to get path param.
   * @param {CharacterService} characterService - Service to obtain characters.
   */
  constructor(
    private router: Router,
    private houseService: HouseService,
    private bookService: BookService,
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  /**
   * Load house and init variables.
   */
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('name');
    this.houseService.getHouse(index).subscribe(data => {
      this.house = data[0];
      this.loadHeirCharacter();
      this.loadCurrentLordCharacter();
      this.loadFounderCharacter();
      this.loadLordCharacter();
      this.loadCadetBranches();
      this.loadSwornCharacters();
    });
  }

  /**
   * Load sworn characters for the house.
   */
  loadSwornCharacters() {
    if (!this.house.swornMembers) {
      return;
    }
    let characterObservables = this.house.swornMembers.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.house.swornMembersCharacters = characters.map(character => character);
    });
  }

  /**
 * Load cade branches for the house.
 */
  loadCadetBranches() {
    if (!this.house.cadetBranches) {
      return;
    }
    let characterObservables = this.house.cadetBranches.map(url => this.houseService.getHouseFromString(url));

    forkJoin(characterObservables).subscribe(houses => {
      this.house.cadetBranchesHouses = houses.map(house => house);
    });
  }

 /**
 * Load lord character for the house.
 */
  loadLordCharacter() {
    if (!this.house.overlord) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.house.overlord);
    characterObservable.subscribe(character => {
      this.house.lord = character;
    });
  }

  /**
   * CurrentLord sworn characters for the house.
   */
  loadCurrentLordCharacter() {
    if (!this.house.currenctLord) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.house.currenctLord);
    characterObservable.subscribe(character => {
      this.house.currLord = character;
    });
  }

    /**
   * Load heir  characters for the house.
   */
  loadHeirCharacter() {
    if (!this.house.heir) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.house.heir);
    characterObservable.subscribe(character => {
      this.house.heirCharacter = character;
    });
  }

    /**
   * Load founder characters for the house.
   */
  loadFounderCharacter() {
    if (!this.house.founder) {
      return;
    }
    let characterObservable = this.characterService.getCharacterFromString(this.house.founder);
    characterObservable.subscribe(character => {
      this.house.founderCharacter = character;
    });
  }

  /**
   * Redirect to the character with the given name..
   * @param {string} characterName - The name of the character.
   */
  redirectToCharacterPage(characterName: string): void {
    if (characterName) {
      this.router.navigate(['/character'], { queryParams: { name: characterName } });
    }
  }

  /**
   * Navigate to the house with the given name.
   * @param houseName - House name where we navigate
   */
  redirectToHousePage(houseName: string): void {
    if (houseName) {
      this.router.navigate(['/house'], { queryParams: { name: houseName } })
        .then(() => {
          window.location.reload();
        });
    }
  }
}
