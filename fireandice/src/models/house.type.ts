import { Character } from "./character.type"

export interface House {
    url:string
    name:string
    region:string
    coatOfArms:string
    word:string
    titles:string[]
    seats:string[]
    currenctLord:string
    heir:string
    overlord:string
    overlordName:string
    founded:string
    founder:string
    diedOut:string
    ancestralWeapons:string[]
    cadetBranches:string[]
    swornMembers:string[]
    founderName:string
    lord:Character
    currLord:Character
    founderCharacter:Character
    heirCharacter:Character
    swornMembersCharacters:Character[]
    cadetBranchesHouses:House[]

}