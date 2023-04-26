import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public book !: Book;
  constructor(private bookService: BookService, private route: ActivatedRoute, private characterService:CharacterService) { }
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('index');
    this.bookService.getBook(index).subscribe(data => {
      this.book = data;
      this.loadCharacterNames();
      this.loadPovCharacterNames();
    });
  }

  loadCharacterNames() {
    let characterObservables = this.book.characters.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(characterObservables).subscribe(characters => {
      this.book.characterNames = characters.map(character => character.name);
    });
  }
  
  loadPovCharacterNames() {
    let povCharacterObservables = this.book.povCharacters.map(url => this.characterService.getCharacterFromString(url));

    forkJoin(povCharacterObservables).subscribe(characters => {
      this.book.povCharacterNames = characters.map(character => character.name);
    });
  }
}
