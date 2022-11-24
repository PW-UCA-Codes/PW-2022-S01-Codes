import classes from './Header.module.scss';
import logo from '../../assets/logo.png';
import Button from '../Button/Button';

import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={classes["Header"]} >
      <div className={classes["Title"]} onClick={() => navigate("/")}>
        <figure>
          <img src={logo} />
        </figure>

        <h1> What do you think? </h1>
      </div>

      <div className={classes["Buttons"]}>
        <Button onClick={() => navigate("/auth/signin")}> Sign in </Button>
        <Button onClick={() => navigate("/auth/signup")}> Sign up </Button>
      </div>
    </header>
  );
}

export default Header;