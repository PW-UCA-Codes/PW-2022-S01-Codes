import classes from './Header.module.scss';
import logo from '../../assets/logo.png';
import Button from '../Button/Button';

const Header = () => {
  return (
    <header className={classes["Header"]} >
      <div className={classes["Title"]}>
        <figure>
          <img src={logo} />
        </figure>

        <h1> What do you think? </h1>
      </div>

      <div className={classes["Buttons"]}>
        <Button> Sign in </Button>
        <Button> Sign up </Button>
      </div>
    </header>
  );
}

export default Header;