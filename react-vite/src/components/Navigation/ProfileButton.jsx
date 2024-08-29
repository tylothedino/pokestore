import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const url = window.location.href;
  const nav = useNavigate();

  useEffect(() => {
    setShowMenu(false)
  }, [nav, url])

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };



  return (
    <>
      <img onClick={toggleMenu} className="profile-icon" src="https://cdn2.iconfinder.com/data/icons/pokemon-go-16/614/8349_-_Psyduck-1024.png" />
      {showMenu && (
        <div className={"profile-dropdown profile-container"} ref={ulRef} onMouseLeave={toggleMenu}>
          {user ? (
            <>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <div>
                <button onClick={(e) => { e.stopPropagation; closeMenu(); nav('/list') }}>My lists</button>
              </div>
              <div>
                <button onClick={(e) => { e.stopPropagation; closeMenu(); nav('/order') }}>Orders</button>
              </div>
              <div>
                <button onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )
      }
    </>
  );
}

export default ProfileButton;
