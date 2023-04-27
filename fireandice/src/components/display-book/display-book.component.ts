/**
 * This component is for displaying the info of one book.
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Book } from 'src/models/book.type';
import { BookService } from 'src/services/book.service';
import { CharacterService } from 'src/services/characters.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent {
  /**
   * The book object to display.
   */
  public book !: Book;

  /**
   * Constructor
   * @param {BookService} bookService - Service to obtain books.
   * @param {ActivatedRoute} route - Route to get path param.
   * @param {CharacterService} characterService - Service to obtain characters.
   * @param {Router} router - Router for routing.
   */
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private router: Router
  ) {}

  /**
   * Load book and init variables.
   */
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('name');
    this.bookService.getBook(index).subscribe(data => {
      this.book = data[0];
      this.loadCharacterNames();
      this.loadPovCharacterNames();
    });
  }

  /**
   * Load character names for the book.
   */
  loadCharacterNames() {
    let characterObservables = this.book.characters.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.book.characterNames = characters.map(character => character.name);
    });
  }
  
  /**
   * Loads POV character names for the book.
   */
  loadPovCharacterNames() {
    let povCharacterObservables = this.book.povCharacters.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(povCharacterObservables).subscribe(characters => {
      this.book.povCharacterNames = characters.map(character => character.name);
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
}
