import { createCookie } from 'react-router';

export const languageCookie = createCookie('lng', {
  maxAge: 60 * 60 * 24 * 30,
  sameSite: 'lax',
});
