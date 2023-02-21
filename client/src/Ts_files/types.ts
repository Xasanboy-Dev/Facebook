export interface Video {
  id: number;
  published: boolean;
  authorId: number;
  authorEmail: string;
  VideoName: string;
  createdAt: number;
  title: string;
  likes: number[];
  dislikes: number[];
  text: string;
  postId: number;
}

export interface Posts {
  id: number;
  published: boolean;
  title: string;
  email: string;
  type_of_post: string;
  user_Id: number;
  user_name: string;
  likes_of_this_Post: number[];
  dislikes_of_this_Post: number[];
  text: string;
  createdAt: number;
}

export interface Images {
  id: number;
  published: boolean;
  authorId: number;
  authorEmail: string;
  createdAt: number;
  title: string;
  likes_of_this_Post: number[];
  dislikes_of_this_Post: number[];
  postId: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  lastname: string;
  password: string;
  published: boolean;
  publishedPhotos: number[];
  publishedVideos: number[];
  userLike: number[];
  userDislike: string[];
  userFavorites: number[];
  imageUrl: string;
  friends: number[];
}
