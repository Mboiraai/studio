import type { Profile, Match } from './types';

// This data is now fetched from Firestore. These arrays are kept to prevent build errors in case they are imported elsewhere.
export const profiles: Profile[] = [];
export const matches: Match[] = [];
