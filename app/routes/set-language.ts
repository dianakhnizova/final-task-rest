import { type ActionFunctionArgs, redirect } from 'react-router';
import { AppRoutes, InputName, Language } from '@/sources/enums';
import { languageCookie } from '../cookies.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let lng: Language =
    (formData.get(InputName.LANGUAGE)?.toString() as Language) || Language.EN;

  if (![Language.EN, Language.RU].includes(lng)) {
    lng = Language.EN;
  }

  return redirect(request.headers.get('Referer') ?? AppRoutes.HOME, {
    headers: { 'Set-Cookie': await languageCookie.serialize(lng) },
  });
}
