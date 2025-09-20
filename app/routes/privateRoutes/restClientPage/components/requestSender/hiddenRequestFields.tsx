import type { FetchValues } from '@/sources/interfaces';
import { inputFetchFields } from '@/sources/lists/inputFetchFields';

interface HiddenFieldsProps extends FetchValues {
  requestDataJson: string;
}

export const HiddenRequestFields = ({
  requestDataJson,
  ...props
}: HiddenFieldsProps) => {
  const fields = inputFetchFields(props);

  return (
    <>
      {fields.map(field => (
        <input
          key={field.id}
          id={field.id}
          type={field.type}
          name={field.name}
          value={field.value ?? ''}
          readOnly
          hidden
        />
      ))}

      <input type="hidden" name="requestData" value={requestDataJson} />
    </>
  );
};
