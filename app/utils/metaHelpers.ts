export interface PageMeta {
  metaTitle: string;
  metaName: string;
  metaContent: string;
}

export function pageMeta(data: PageMeta) {
  return () => [
    { title: data.metaTitle },
    {
      name: data.metaName,
      content: data.metaContent,
    },
  ];
}
