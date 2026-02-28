import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { logoutUser } from '@slices';
import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    const logout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        navigate('/login', { replace: true });
      } catch {}
    };

    void logout();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
