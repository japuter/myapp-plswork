import {useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext'; // Adjust the import path if necessary

const Layout = () => {
  const {user, handleAutoLogin, handleLogout} = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleAutoLogin();
  }, []); // Dependency array is empty to mimic componentDidMount

  // Log out and navigate to the home page
  const logout = () => {
    handleLogout();
    navigate('/'); // Assuming '/' is your home route
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Etusivu 🏠</Link>
          {user ? (
            <>
              <Link to="/profile">Profiili 😃</Link>
              <Link to="/upload">Upload</Link>
              {/* The Logout link now calls the logout function */}
              <button
                onClick={logout}
                style={{all: 'unset', cursor: 'pointer'}}
              >
                Logout💣
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login⚔️</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="m-12 text-xl">Copyright 2024</footer>
    </div>
  );
};

export default Layout;
