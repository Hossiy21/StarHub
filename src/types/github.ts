export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
}

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export type SortOption = 'stars' | 'name' | 'recent';

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export interface ScanResult {
  username: string;
  user: GithubUser | null;
  repos: GithubRepo[];
  totalStars: number;
  mostUsedLanguage: string;
  rateLimit?: RateLimit;
}

export interface StatsData {
  totalRepos: number;
  totalStars: number;
  topLang: string;
}
