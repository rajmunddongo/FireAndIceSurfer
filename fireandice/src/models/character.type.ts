import { House } from "./house.type"

export interface Character {
    url:string
    name:string
    gender:string
    culture:string
    born:string
    died:string
    titles:string[]
    aliases:string[]
    father:string
    fatherCharacter:Character
    mother:string
    motherCharacter:Character
    spouse:string
    spouseCharacter:Character
    allegiances:string[]
    allegianceHouses:House[]
    books:string[]
    bookNames:string[]
    povBooks:string[]
    tvSeries:string[]
    playedBy:string[]
}