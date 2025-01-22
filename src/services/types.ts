export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
};
