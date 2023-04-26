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
  public Characters: Character[] = [];

  public characterPage = 2;

  constructor(private characterService: CharacterService,private router:Router) { }

  ngOnInit(): void {
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
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
    if (this.characterPage != 2)
      this.characterPage--;
    this.characterService.getHouses("?page=" + this.characterPage + "&pageSize=10").subscribe(data => {
      this.Characters = data
    })
  }
  goToCharacter(name: string) {
    this.router.navigate(['/character'], { queryParams: { name: name } });
  }
  
  
  
}
