import { AchievementCriteria } from "./achievements";

// messy file will fix later
export interface Token {
  access_token: string;
}


export interface Self {
  href: string;
}

export interface Links {
  self: Self;
}

export interface Key {
  href: string;
}

export interface Realm {
  key: Key;
  name: string;
  id: number;
  slug: string;
}

export interface Faction {
  type: string;
  name: string;
}

export interface Guild {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
  faction: Faction;
}


export interface Realm {
  key: Key;
  id: number;
  slug: string;
}

export interface PlayableClass {
  key: Key;
  id: number;
  name?: Name
}

export interface PlayableRace {
  key: Key;
  id: number;
}

export interface CharacterMin {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
}

export interface Character {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
  level: number;
  playable_class?: PlayableClass;
  playable_race?: PlayableRace;
}

export interface Member {
  character: Character;
  rank: number;
}

export interface Roster {
  _links: Links;
  guild: Guild;
  members: Member[];
}

export interface I18n {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

export interface Male extends I18n {
}

export interface Female extends I18n {
}

export interface GenderName {
  male: Male;
  female: Female;
}
export interface Name extends I18n {
}

export interface PowerType {
  key: Key;
  name: Name;
  id: number;
}

export interface Specialization {
  key: Key;
  name: Name;
  id: number;
}

export interface Media {
  key: Key;
  id: number;
}

export interface PvpTalentSlots {
  href: string;
}

export interface PlayableClassDetail {
  _links: Links;
  id: number;
  name: Name;
  gender_name: GenderName;
  power_type: PowerType;
  specializations: Specialization[];
  media: Media;
  pvp_talent_slots: PvpTalentSlots;
}

export interface EnrichedCharacter {
  name: string;
  level: number;
  playable_class: PlayableClass;
  media?: Asset[];
  rank: number;
  achievements: AchievementCriteria[];
}

export interface Classes {
  [key: string]: PlayableClassDetail;
}


export enum MediaType {
  AVATAR= "avatar",
  INSET = "inset",
  MAIN = "main",
  MAINRAW = "main-raw",
}
export interface Asset {
  key: string;
  value: string;
}

export interface MediaList {
  _links: Links;
  character: CharacterMin;
  assets?: Asset[];
}

