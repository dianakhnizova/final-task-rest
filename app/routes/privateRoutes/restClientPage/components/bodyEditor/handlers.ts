import type { CodeLanguage } from '@/sources/enums';

export const handleBodyEditor = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setBody: (value: string) => void
) => {
  setBody(event.target.value);
};

export const handleLanguage = (
  value: CodeLanguage | null,
  setLanguage: (method: CodeLanguage) => void
) => {
  if (value) setLanguage(value);
};
