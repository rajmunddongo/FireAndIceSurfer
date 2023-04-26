import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Character } from 'src/models/character.type';
import { BookService } from 'src/services/book.service';
import { CharacterService } from 'src/services/characters.service';

@Component({
  selector: 'app-display-character',
  templateUrl: './display-character.component.html',
  styleUrls: ['./display-character.component.scss']
})
export class DisplayCharacterComponent {
  public character !: Character;
  constructor(private characterService: CharacterService, private bookService: BookService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('name');
    this.characterService.getCharacter(index).subscribe(data => {
      this.character = data[0];
      const bookObservables = this.character.books.map(bookUrl => this.bookService.getBookFromString(bookUrl));
      forkJoin(bookObservables).subscribe(books => {
        this.character.bookNames = books.map(book => book.name);
      });
      this.loadSwornCharacters();
    });
  }

  loadSwornCharacters() {
    if (!this.character.allegiances) {
      return;
    }
    let characterObservables = this.character.allegiances.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.character.allegianceCharacters = characters.map(character => character);
    });
  }
}
