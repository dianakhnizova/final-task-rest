import { type ActionFunctionArgs, redirect } from 'react-router';

import { languageCookie } from '../cookies.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let lng = formData.get('lng')?.toString() || 'en';
  console.log('Language from form:', lng);

  if (!['en', 'ru'].includes(lng)) {
    lng = 'en';
  }
  const headers = {
    'Set-Cookie': await languageCookie.serialize(lng),
  };
  console.log('Setting cookie:', headers);

  return redirect(request.headers.get('Referer') ?? '/', {
    headers: {
      'Set-Cookie': await languageCookie.serialize(lng),
    },
  });
}
