import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/user/userThunks';
import {
  getIsAuthenticated,
  getUserError
} from '../../services/slices/user/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(getUserError);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
