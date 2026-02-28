import { FC, SyntheticEvent, useState } from 'react';

import { selectAuthError } from '@selectors';
import { registerUser } from '@slices';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const authError = useSelector(selectAuthError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const register = async () => {
      try {
        await dispatch(
          registerUser({ name: userName, email, password })
        ).unwrap();
      } catch {}
    };

    void register();
  };

  return (
    <RegisterUI
      errorText={authError || undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
