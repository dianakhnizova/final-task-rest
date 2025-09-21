export const createWrapperPortal = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.append(wrapperElement);

  return wrapperElement;
};
