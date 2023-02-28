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

export interface  Posts {
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
  savedUser: string[];
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
  description: string
  phoneNumber: string
  address: string
  company: string
  Profession: string
  Country: string
  Bio: string
}

export interface Comments {
  id: number;
  postId: number;
  typeOfPost: string;
  userId: number;
  userEmail: string;
  texts: string;
  createdDate: string;
}
