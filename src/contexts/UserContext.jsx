import {createContext, useContext, useState, useEffect} from 'react';
import {useAuthentication, useUser} from '../hooks/ApiHooks';
import {useNavigate, useLocation} from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState();
  const {login} = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();
  const {getUserByToken} = useUser();

  console.log('user in UserProvider', user);

  const handleLogin = async (credentials) => {
    console.log('credentials', credentials);
    console.log({credentials});
    try {
      const userData = await login(credentials);
      console.log('userData', userData);
      localStorage.setItem('token', userData.token);
      setUser(userData.user); // tämä lisää contextiin userin kirjautumisessa
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
    navigate('/');
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
        // when page is refreshed, the user is redirected to origin (see ProtectedRoute.jsx)
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
