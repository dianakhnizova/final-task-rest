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
  },
  {
    nameKey: 'developers.diana',
    photo: '/diana.jpg',
  },
  {
    nameKey: 'developers.olexandr',
    photo: '/alex.jpg',
  },
];

export const developerLinkList = [
  { gitHub: GITHUB_ALEXANDR },
  {
    gitHub: GITHUB_DIANA,
  },
  {
    gitHub: GITHUB_ALEX,
  },
];
