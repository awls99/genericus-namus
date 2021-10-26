import { Key, Links } from "./models";


export interface ChildCriteria {
  id: number;
  amount: number;
  is_completed: boolean;
  child_criteria: ChildCriteria[];
}

export interface Criteria {
  id: number;
  is_completed: boolean;
  child_criteria: ChildCriteria[];
  amount?: number;
}

export interface Achievement {
  id: number;
  achievement: Achievement;
  criteria: Criteria;
  completed_timestamp: any;
}

export interface Category {
  key: Key;
  name: string;
  id: number;
}

export interface CategoryProgress {
  category: Category;
  quantity: number;
  points: number;
}
export interface Achievement {
  key: Key;
  name: string;
  id: number;
}

export interface RecentEvent {
  achievement: Achievement;
  timestamp: any;
}

export interface Realm {
  key: Key;
  name: string;
  id: number;
  slug: string;
}

export interface Character {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
}

export interface Statistics {
  href: string;
}

export interface CharacterAchievements {
  _links: Links;
  total_quantity: number;
  total_points: number;
  achievements: Achievement[];
  category_progress: CategoryProgress[];
  recent_events: RecentEvent[];
  character: Character;
  statistics: Statistics;
}



