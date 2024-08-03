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
  tags: TagProps[];
  like: number;
  view: number;
  share: number;
}

export interface TagProps {
  name: string;
  _id: string;
  url: string;
}
