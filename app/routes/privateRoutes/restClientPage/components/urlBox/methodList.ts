import { Methods } from '@/sources/enums';

export type Method = Methods;

export const methodList: Method[] = [
  Methods.GET,
  Methods.POST,
  Methods.PUT,
  Methods.PATCH,
  Methods.DELETE,
];
