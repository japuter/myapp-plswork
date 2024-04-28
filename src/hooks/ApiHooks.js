import {useEffect, useState} from 'react';
import {fetchData} from '../lib/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {getUserById} = useUser();
  const getMedia = async () => {
    const mediaResult = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
    );

    const mediaWithUser = await Promise.all(
      mediaResult.map(async (mediaItem) => {
        const userResult = await getUserById(mediaItem.user_id);
        return {...mediaItem, username: userResult.username};
      }),
    );

    setMediaArray(mediaWithUser);
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

const useUser = () => {
  const getUserById = async (id) => {
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
    return userResult;
  };

  const getUserByToken = async () => {
    const token = localStorage.getItem('token');
    const userResult = await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return userResult;
  };

  return { getUserById, getUserByToken };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
      console.log(loginResult);
      localStorage.setItem('token', loginResult.token); // Save token to localStorage
      window.location.href = '/'; // Redirect to 'Home'
      return loginResult;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return { postLogin };
};

export { useMedia, useUser, useAuthentication };
