import { useState, useEffect } from 'react';
import classes from './Feed.module.scss';

import NewPostForm from "./NewPostForm/NewPostForm";
import Posts from "./Posts/Posts";

import { toast } from 'react-toastify';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  //Esto se ejecuta 1 vez, después del 1er render
  useEffect(() => {
    fetchPosts();
  }, []);

  //función fetch para todos los elementos
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3500/api/post/");

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts)
      }
    } catch (error) {
      toast.error("Unexpected error!");
    }
  }

  //Función para guardar un post en la API
  const savePost = async (title, description, image) => {
    try {
      const response = await fetch("http://localhost:3500/api/post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, description, image
        })
      });

      if (response.ok) {
        toast.success("Post saved!")
      } else {
        const msg = {
          "400": "Wrong fields",
          "404": "Not Found"
        }

        toast.warn(msg[response.status.toString()] || "Unexpected error!")
      }
    } catch (error) {
      toast.error("Unexpected error!");
    }
  }

  //Handler de añadir posts
  const onAddPostHandler = async (title, description, image) => {
    /* const _posts = [...posts, {
      _id: new Date().getTime().toString(),
      title: title,
      description: description,
      image: image
    }]; */

    /* _posts.push({
      _id: new Date().getTime().toString(),
      title: title,
      description: description,
      image: image
    }); */

    /* setPosts(_posts); */

    await savePost(title, description, image);
    fetchPosts();
  }

  return (
    <div className={classes["feed-wrapper"]}>
      {/* Formulario */}
      <NewPostForm onAddPost={onAddPostHandler} />

      {/* Main Feed */}
      <Posts posts={posts} />
    </div>
  )
}

export default Feed;