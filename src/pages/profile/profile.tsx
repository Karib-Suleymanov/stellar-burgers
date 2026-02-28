import { ProfileUI } from '@ui-pages';
import { selectUpdateUserError, selectUser } from '@selectors';
import { updateUser } from '@slices';
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';

import { Preloader } from '../../components/ui';
import { useDispatch, useSelector } from '../../services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUpdateUserError);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormValue((prevState) => ({
      ...prevState,
      name: user.name,
      email: user.email
    }));
  }, [user]);

  if (!user) {
    return <Preloader />;
  }

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const changedFields: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (formValue.name !== user.name) {
      changedFields.name = formValue.name;
    }

    if (formValue.email !== user.email) {
      changedFields.email = formValue.email;
    }

    if (formValue.password) {
      changedFields.password = formValue.password;
    }

    if (!Object.keys(changedFields).length) {
      return;
    }

    const saveProfile = async () => {
      try {
        await dispatch(updateUser(changedFields)).unwrap();
        setFormValue((prevState) => ({
          ...prevState,
          password: ''
        }));
      } catch {}
    };

    void saveProfile();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError || undefined}
    />
  );
};
