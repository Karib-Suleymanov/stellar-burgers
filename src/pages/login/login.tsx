import { FC, SyntheticEvent, useState } from 'react';

import { selectAuthError } from '@selectors';
import { loginUser } from '@slices';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const authError = useSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const login = async () => {
      try {
        await dispatch(loginUser({ email, password })).unwrap();
      } catch {}
    };

    void login();
  };

  return (
    <LoginUI
      errorText={authError || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
