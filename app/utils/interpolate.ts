export const interpolate = (str: string, template: Map<string, string>) => {
  for (const [key, value] of template) {
    str = str.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return str;
};
