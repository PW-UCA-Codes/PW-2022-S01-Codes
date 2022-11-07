import Button from '../../Button/Button';
import classes from './NewPostForm.module.scss';

const NewPostForm = ({ onAddPost = () => { } }) => {

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    //Ejecutar el insert al server
    onAddPost(data.get("title"), data.get("description"), data.get("image"));
  }

  return (
    <section className={classes["post-form-section"]}>
      <h3> Tell us what's happening </h3>

      <form onSubmit={onSubmitHandler}>
        <label>
          What are you thinking? *
          <input name="title" />
        </label>

        <label>
          Let's describe it *
          <textarea name="description" rows={5} />
        </label>

        <label>
          Show us a picture
          <input name="image" type="url" />
        </label>

        <Button type="submit">
          Save Post
        </Button>
      </form>
    </section>
  );
}

export default NewPostForm;