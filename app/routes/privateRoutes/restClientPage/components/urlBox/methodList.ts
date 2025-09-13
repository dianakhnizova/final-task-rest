import { HttpMethods } from '@/sources/enums';

export type Method = HttpMethods;

export const methodList: Method[] = [
  HttpMethods.GET,
  HttpMethods.POST,
  HttpMethods.PUT,
  HttpMethods.PATCH,
  HttpMethods.DELETE,
];
