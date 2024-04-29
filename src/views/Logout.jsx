// Logout.jsx
import {useUserContext} from '../hooks/contextHooks';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
  const {handleLogout} = useUserContext(); // Use the provided handleLogout from context
  const navigate = useNavigate();

  // This function now simply calls the handleLogout from context
  const logout = () => {
    handleLogout();
    navigate('/'); // Navigate to home after logout
  };

  // Add a button or some other trigger to call the logout function when needed
  return <button onClick={logout}>Log Out</button>;
};

export default Logout;
