import { Routes, Route, Navigate } from 'react-router-dom';

import classes from './AuthView.module.scss';

import LoginForm from '../../components/AuthForms/LoginForm/LoginForm';
import RegisterForm from '../../components/AuthForms/RegisterForm/RegisterForm';

const AuthView = () => {
  return (
    <div className={classes["container"]}>
      <div className={classes["card"]}>
        <Routes>
          <Route path='signin' element={<LoginForm />} />
          <Route path='signup' element={<RegisterForm />} />
          <Route path='*' element={<Navigate to="/not-found" />} />
        </Routes>
      </div>
    </div>
  )
}

export default AuthView;