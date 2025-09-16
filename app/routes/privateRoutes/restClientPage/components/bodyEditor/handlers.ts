export const handleBodyEditor = (
  event: React.ChangeEvent<HTMLTextAreaElement>,
  setBody: (value: string) => void
) => {
  setBody(event.target.value);
};
