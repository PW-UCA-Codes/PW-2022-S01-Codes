import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../Button/Button';
import classes from './../AuthForm.module.scss';

const LoginForm = ({ onLogin = () => { } }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const errors = {
    "identifier": !identifier,
    "password": !password,
  }

  const hasErrors = () => Object.values(errors).some(error => error);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (hasErrors()) {
      toast.warn("Wrong fields");
      return;
    }

    onLogin(identifier, password);
  }

  return (
    <section className={classes["container"]}>
      <h3> Tell us who you are... </h3>

      <form onSubmit={onSubmitHandler}>
        <label>
          I am... *
          <input
            className={errors["identifier"] ? classes["error"] : ""}
            type={"text"}
            name="identifier"
            autoComplete='username'
            value={identifier}
            onChange={({ target }) => { setIdentifier(target.value) }} />
        </label>

        <label>
          Passphrase... *
          <input
            className={errors["password"] ? classes["error"] : ""}
            type={"password"}
            name="password"
            autoComplete='current-password'
            value={password}
            onChange={({ target }) => { setPassword(target.value) }} />
        </label>

        <Button type="submit" disabled={hasErrors()}>
          Sign in
        </Button>
      </form>
    </section>
  );
}

export default LoginForm;