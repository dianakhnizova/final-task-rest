import { describe, expect, it } from 'vitest';
import {
  GITHUB_ALEX,
  GITHUB_ALEXANDR,
  GITHUB_DIANA,
} from '../constants/constants';
import { developerList } from './developerList';

describe('developerList', () => {
  it('should have 3 developers', () => {
    expect(developerList).toHaveLength(3);
  });

  it('should contain correct GitHub links', () => {
    const githubLinks = developerList.map(dev => dev.gitHub);
    expect(githubLinks).toContain(GITHUB_ALEX);
    expect(githubLinks).toContain(GITHUB_ALEXANDR);
    expect(githubLinks).toContain(GITHUB_DIANA);
  });

  it('should have correct nameKey and photo properties', () => {
    developerList.forEach(dev => {
      expect(dev.nameKey).toMatch(/^developers\./);
      expect(typeof dev.photo).toBe('string');
    });
  });
});
