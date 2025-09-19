import type { FetchValues } from '@/sources/interfaces';
import { inputFetchFields } from '@/sources/lists/inputFetchFields';

export const HiddenRequestFields = (props: FetchValues) => {
  const fields = inputFetchFields(props);

  return (
    <>
      {fields.map(field => (
        <input
          key={field.id}
          id={field.id}
          type={field.type}
          name={field.name}
          value={field.value}
        />
      ))}
    </>
  );
};
