import {
  GITHUB_ALEX,
  GITHUB_ALEXANDR,
  GITHUB_DIANA,
} from '../constants/constants';
import type { Developer } from '../interfaces';

export const developerList: Developer[] = [
  {
    nameKey: 'developers.alexandr',
    photo: '/alexandr.png',
    gitHub: GITHUB_ALEXANDR,
  },
  {
    nameKey: 'developers.diana',
    photo: '/diana.jpg',
    gitHub: GITHUB_DIANA,
  },
  {
    nameKey: 'developers.olexandr',
    photo: '/alex.jpg',
    gitHub: GITHUB_ALEX,
  },
];
