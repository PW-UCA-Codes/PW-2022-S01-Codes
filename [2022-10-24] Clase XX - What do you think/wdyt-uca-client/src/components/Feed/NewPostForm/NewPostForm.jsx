import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../Button/Button';
import classes from './NewPostForm.module.scss';

const NewPostForm = ({ onAddPost = () => { } }) => {
  const [titleField, setTitle] = useState("");
  const [descriptionField, setDescription] = useState("");
  const [imageField, setImage] = useState("");

  const errors = {
    "title": !titleField,
    "description": !descriptionField || descriptionField.length > 280,
    "image": imageField.length > 0 && !(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(imageField)
  }

  const hasErrors = () => {
    return Object.values(errors).some(error => error);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (hasErrors()) {
      toast.warn("Your fields are wrong!")
      return;
    }

    //Ejecutar el insert al server
    onAddPost(titleField, descriptionField, imageField);

    setTitle("");
    setDescription("");
    setImage("")
  }

  return (
    <section className={classes["post-form-section"]}>
      <h3> Tell us what's happening </h3>

      <form onSubmit={onSubmitHandler}>
        <label>
          What are you thinking? *
          <input
            name="title"
            className={errors["title"] ? classes["error"] : ""}
            value={titleField}
            placeholder="Title of your post"
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </label>

        <label>
          Let's describe it *
          <textarea
            name="description"
            className={errors["description"] ? classes["error"] : ""}
            rows={5}
            value={descriptionField}
            onChange={(e) => { setDescription(e.target.value) }}
            placeholder="Description of your post"
          />

          <div className={classes["chars-left"]}>
            {descriptionField.length} / 280
          </div>
        </label>

        <label>
          Show us a picture
          <input
            name="image"
            className={errors["image"] ? classes["error"] : ""}
            type="url"
            placeholder='https://example.io/image.png'
            value={imageField}
            onChange={(e) => { setImage(e.target.value) }} />
        </label>

        <Button type="submit" disabled={hasErrors()}>
          Save Post
        </Button>
      </form>
    </section>
  );
}

export default NewPostForm;