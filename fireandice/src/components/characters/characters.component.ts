import { Component } from '@angular/core';
import { Character } from 'src/models/character.type';
import { CharacterService } from 'src/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {
  public Characters: Character[] = [];

  public characterPage = 1;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.getHouses("").subscribe(data => {
      this.Characters = data
    })
  }

  nextHousePage() {
    this.characterPage++;
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data
    })
  }
  previousHousePage() {
    if (this.characterPage != 0)
      this.characterPage--;
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data
    })
  }
}
