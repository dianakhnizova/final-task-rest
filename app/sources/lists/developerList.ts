import {
  GITHUB_ALEX,
  GITHUB_ALEXANDR,
  GITHUB_DIANA,
} from '../constants/constants';
import type { Developer } from '../interfaces';

export const developerList: Developer[] = [
  {
    name: 'Vavilov Alexandr',
    photo: '/alexandr.png',
    gitHub: GITHUB_ALEXANDR,
  },
  {
    name: 'Khnizova Diana',
    photo: '/diana.jpg',
    gitHub: GITHUB_DIANA,
  },
  {
    name: 'Vavilov Alex',
    photo: '/alexandr.png',
    gitHub: GITHUB_ALEX,
  },
];
