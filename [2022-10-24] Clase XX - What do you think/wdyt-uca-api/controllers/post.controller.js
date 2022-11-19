const Post = require("../models/Post.model");
const User = require("../models/User.model");
const debug = require("debug")("app:post-controller");

const controller = {};

controller.create = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { _id: userId } = req.user;

    const post = new Post({
      title: title,
      description: description,
      image: image,
      user: userId
    });

    const newPost = await post.save();

    if (!newPost) {
      return res.status(409).json({ error: "Ocurrio un error al crear el post" });
    }

    return res.status(201).json(newPost);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.findAll = async (req, res) => {
  try {
    const posts =
      await Post
        .find({ hidden: false })
        .populate("user", "username email")
        .populate("likes", "username email");

    return res.status(200).json({ posts });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.findOwn = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const posts =
      await Post
        .find({ user: userId })
        .populate("user", "username email")
        .populate("likes", "username email");

    return res.status(200).json({ posts })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.findPostsByUser = async (req, res) => {
  try {
    const { identifier } = req.params;

    const posts = await Post.find({ user: identifier, hidden: false });

    return res.status(200).json({ posts });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.findOneById = async (req, res) => {
  try {
    const { identifier } = req.params;

    const post = await Post
      .findOne({ _id: identifier, hidden: false })
      .populate("user", "username email")
      .populate("likes", "username email");

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.status(200).json(post);
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.getOwnSavedPosts = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .populate("savedPosts");

    return res.status(200).json({ posts: user.savedPosts.filter(post => !post.hidden) });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.togglePostVisibility = async (req, res) => {
  try {
    const { identifier: postId } = req.params;
    const { _id: userId } = req.user;

    //Paso 01: Obtenemos el post
    //Paso 02: Verificamos la pertenencia del post al usuario
    const post = await Post.findOne({ _id: postId, user: userId });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    //Paso 03: Modifico el valor
    post.hidden = !post.hidden;

    //Paso 04: Guardo los cambios
    await post.save();

    return res.status(200).json({ message: "Post actualizado" })
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.togglePostLike = async (req, res) => {
  try {
    const { identifier: postId } = req.params;
    const { _id: userId } = req.user;

    //Paso 01: Obtener el post (id, hidden: false)
    const post = await Post.findOne({ _id: postId, hidden: false });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" })
    }

    //Paso 02: Determinar si debo añadir o quitar un like
    const index = post.likes.findIndex(_userId => _userId.equals(userId));

    //Paso 03: Ejecutar el toggle
    if (index >= 0) {
      //Quitar un like
      post.likes = post.likes.filter(_userId => !_userId.equals(userId));
    } else {
      //Poner un like
      post.likes = [...post.likes, userId];
    }

    //Paso 04: Guardar los cambios
    await post.save();

    return res.status(200).json({ message: "Post actualizado" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

controller.toggleSavedPost = async (req, res) => {
  try {
    const { identifier: postId } = req.params;
    const { user } = req;

    //Paso 01: Buscar el post(id, hidden -> false)
    const post = await Post.findOne({ _id: postId, hidden: false });

    if (!post) {
      return res.status(404).json({ error: "Post no ha sido encontrado" });
    }

    //Paso 02: Verificar si tengo que agregar o si tengo que quitar
    const index = user.savedPosts.findIndex(_postId => _postId.equals(post._id));

    if (index >= 0) {
      //Quitar el post de guardados
      user.savedPosts = user.savedPosts.filter(_postId => !_postId.equals(post._id));
    } else {
      //Añadir el post a guardados
      user.savedPosts = [...user.savedPosts, post._id];
    }

    //Paso 03: guardar los cambios
    await user.save();

    return res.status(200).json({ message: "Post guardado" });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error interno de servidor" });
  }
}

module.exports = controller;