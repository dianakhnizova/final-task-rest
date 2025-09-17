import { InputID, InputName, InputType } from '../enums';
import type { FetchValues, InputFields } from '../interfaces';

export const inputFetchFields = (values: FetchValues): InputFields[] => [
  {
    id: InputID.ID_URL,
    type: InputType.HIDDEN,
    name: InputName.URL,
    value: values.url || '',
  },
  {
    id: InputID.ID_METHOD,
    type: InputType.HIDDEN,
    name: InputName.METHOD,
    value: values.method || '',
  },
  {
    id: InputID.ID_PROTOCOL,
    type: InputType.HIDDEN,
    name: InputName.PROTOCOL,
    value: values.protocol || '',
  },
  {
    id: InputID.ID_BODY,
    type: InputType.HIDDEN,
    name: InputName.BODY,
    value: values.body ? JSON.stringify(values.body) : '',
  },
  {
    id: InputID.ID_HEADERS,
    type: InputType.HIDDEN,
    name: InputName.HEADERS,
    value: JSON.stringify(values.headers || []),
  },
  {
    id: InputID.ID_VARIABLES,
    type: InputType.HIDDEN,
    name: InputName.VARIABLES,
    value: JSON.stringify(values.variables || []),
  },
];
