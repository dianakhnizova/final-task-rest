import { describe, expect, it } from 'vitest';
import { Language } from '@/sources/enums';
import i18n from '../i18n.client';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

describe('i18n initialization', () => {
  it('should be initialized', () => {
    expect(i18n.isInitialized).toBe(true);
  });

  it('should have correct resources', () => {
    expect(i18n.getResourceBundle(Language.EN, 'translation')).toEqual(en);
    expect(i18n.getResourceBundle(Language.RU, 'translation')).toEqual(ru);
  });
});
