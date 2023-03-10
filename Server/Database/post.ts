import { Posts } from "@prisma/client";
import { prisma } from "./db";
import { CheckUserExist, userId } from "../Database/user";
import { getCommentByID } from "./comment.service";
export async function GetPosts() {
  return prisma.posts.findMany();
}

export async function removerPostById(id: number) {
  let post = await prisma.posts.delete({ where: { id } });
  let image = await prisma.images.delete({ where: { postId: id } });
  let video = await prisma.videos.delete({ where: { postId: id } });
  return post;
}

export async function postText(text: string, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return;
  }
  return prisma.posts.create({
    data: {
      email: email,
      text,
      title: "TEXT",
      type_of_post: "Letter",
      user_Id: user!.id,
      user_name: user.name,
    },
  });
}

export async function checkPostSaved(userID: number, postID: number) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return false;
    }
    if (user.userFavorites.includes(postID)) {
      return true;
    } else {
      return "Yoq";
    }
  } catch (error: any) {
    console.log(error.mesage);
    return false;
  }
}

export async function checkPostExist(id: number) {
  try {
    return await prisma.posts.findUnique({ where: { id } });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function deleteWithId(id: number) {
  let post = await prisma.posts.delete({ where: { id } });
  if (post.type_of_post == "Video") {
    return await prisma.videos.delete({ where: { postId: id } });
  } else if (post.type_of_post == "Photo") {
    return await prisma.images.delete({ where: { postId: id } });
  } else {
    return post;
  }
}

export async function getPosts_WhereLikeMore() {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export async function AllPosts() {
  return {
    images: await prisma.images.findMany(),
    vidoes: await prisma.videos.findMany(),
  };
}

export async function writeComment(
  userId: number,
  postID: number,
  letter: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const post: any = await prisma.posts.findUnique({
    where: { id: postID },
  });
  if (user && post) {
    let arr = letter;
    return await prisma.comments_of_posts.update({
      where: { id: postID },
      data: { texts: arr },
    });
  }
}

export async function checkUserLikedOrDisliked(UserId: number, postId: number) {
  try {
    const result = await prisma.posts.findUnique({ where: { id: postId } });
    if (result?.likes_of_this_Post.includes(UserId)) {
      return "LIKED";
    } else if (result?.dislikes_of_this_Post.includes(UserId)) {
      return "DISLIKED";
    } else {
      return "NOT";
    }
  } catch (error: any) {
    return false;
  }
}

export async function deleteLikee(UserId: number, postId: number) {
  try {
    const post = await prisma.posts.findUnique({ where: { id: postId } });
    let arr: number[] = [];
    arr = post!.likes_of_this_Post.filter((num) => num !== UserId);
    const result = await prisma.posts.update({
      where: { id: postId },
      data: { likes_of_this_Post: arr },
    });
    return result;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function deleteDislike(UserId: number, postId: number) {
  try {
    const post = await prisma.posts.findUnique({ where: { id: postId } });
    let arr: number[] = [];
    arr = post!.dislikes_of_this_Post.filter((ids) => ids !== UserId);
    return await prisma.posts.update({
      where: { id: postId },
      data: { dislikes_of_this_Post: arr },
    });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
export async function addLike(UserId: number, postID: number) {
  try {
    const post = await prisma.posts.findUnique({ where: { id: postID } });
    const deletingDislike = await deleteDislike(UserId, postID);
    let arr: number[] = [];
    arr = post!.likes_of_this_Post;
    arr.push(UserId);
    return await prisma.posts.update({
      where: { id: postID },
      data: { likes_of_this_Post: arr },
    });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function addDislikee(userId: number, postID: number) {
  try {
    const post = await prisma.posts.findUnique({ where: { id: postID } });
    let arr = post!.dislikes_of_this_Post;
    arr.push(userId);
    return await prisma.posts.update({
      where: { id: postID },
      data: { dislikes_of_this_Post: arr },
    });
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
export async function savePost(userEmail: string, postId: number) {
  try {
    const user = await CheckUserExist(userEmail);
    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (user && post) {
      let postSaved = post.savedUser;

      let arr = user.userFavorites;
      arr.push(postId);
      return await prisma.user.update({
        where: { id: user.id },
        data: { userFavorites: arr },
      });
    }
  } catch (error: any) {
    return "Internal Error";
  }
}

export async function removeSaved(userEmail: string, postId: number) {
  try {
    const user = await CheckUserExist(userEmail);
    if (user) {
      let arr = user.userFavorites;
      arr = arr.filter((ids) => ids !== postId);
      return await prisma.user.update({
        where: { id: user.id },
        data: { userFavorites: arr },
      });
    }
  } catch (error: any) {
    return "Internal Error";
  }
}

export async function addCommentID(postID: number, commentID: number) {
  try {
    const comment = await getCommentByID(commentID);
    const existPost = await checkPostExist(postID);
    if (comment && existPost) {
      let arr = existPost.commentsID;
      arr.push(comment.id);
      const added = await prisma.posts.update({
        where: { id: postID },
        data: { commentsID: arr },
      });
      return added;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function deleteCommentID(postID: number, commentID: number) {
  try {
    const post = await prisma.posts.findUnique({ where: { id: postID } });
    if (post) {
      let arr = post.commentsID;
      arr = arr.filter((ids) => ids !== commentID);
      const result = await prisma.posts.update({
        where: { id: post.id },
        data: { commentsID: arr },
      });
      return result;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function saveUserToPost(email: string, postID: number) {
  try {
    const post = await checkPostExist(postID);
    const user = await CheckUserExist(email);
    if (post && user) {
      let savedUsers = post.savedUser;
      if (!savedUsers.includes(user.email)) {
        savedUsers.push(user.email);
        const result = await prisma.posts.update({
          where: { id: postID },
          data: { savedUser: savedUsers },
        });
        return result;
      }
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}
export async function removeUserToPost(email: string, postID: number) {
  try {
    const post = await checkPostExist(postID);
    const user = await CheckUserExist(email);
    if (post && user) {
      let savedUsers = post.savedUser;
      if (savedUsers.includes(user.email)) {
        savedUsers = savedUsers.filter((emails) => emails !== user.email);
        const result = await prisma.posts.update({
          where: { id: postID },
          data: { savedUser: savedUsers },
        });
        return result;
      }
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function getLikesPostsByUserId(id: number) {
  try {
    const user = await userId(id);
    if (!user) {
      return false;
    }
    let arr = user.userLike;
    let posts: Posts[] = [];
    for (let i in arr) {
      let post = await checkPostExist(arr[i]);
      if (post) {
        posts.push(post);
      }
    }
    return posts;
  } catch (error: any) {
    return false;
  }
}
