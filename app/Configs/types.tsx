export interface BlogPost {
  _id: number;
  title: string;
  content: string;
  url: string;
  code: string;
  summary: string;
  author: string;
  releaseDate: string;
  updatedAt: string;
  tags: [
    {
      name: string;
      id: "string";
    }
  ];
  like: number;
  view: number;
  share: number;
}
