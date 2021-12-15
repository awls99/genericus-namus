export interface Affix {
  id: number;
  name: string;
  description: string;
  icon: string;
  wowhead_url: string;
}

export interface MythicPlusRecentRun {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  completed_at: Date;
  clear_time_ms: number;
  par_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  score: number;
  affixes: Affix[];
  url: string;
}

export interface RIOProfile {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  honorable_kills: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: Date;
  profile_url: string;
  profile_banner: string;
  mythic_plus_recent_runs: MythicPlusRecentRun[];
  timewalks?: Dungeon[];
}

export interface GuildRun {
  names: string[];
  dungeon: string;
  level: number;
  success: boolean;
  date: Date;
}

export interface RIOProfileV2 {
  characterDetails: CharacterDetails
}
interface CharacterDetails {
  character: Character;
}
interface Character {
  id: number;
}

export interface DungeonDetail {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  expansion_id: number;
  patch: string;
  keystone_timer_ms: number;
}
export interface Dungeon {
  season: string;
  status: string;
  dungeon: DungeonDetail;
  keystone_run_id: number;
  mythic_level: number;
  completed_at: Date;
  num_chests: number;
}

export interface Runs {
  dungeons: Dungeon[];
}

