import { useLogoutUserMutation } from "@/store/api/authApi";
import { useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import {useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const userAuthenticate = useSelector(
    (state) => state.authSlice?.isAuthenticate
  );

  const navigate = useNavigate();

  const [
    logoutUser,
    {
      isLoading: logoutIsLoading,
      isSuccess: logoutIsSuccess,
    },
  ] = useLogoutUserMutation();

  const logOutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if(logoutIsSuccess){
      navigate("/login");
    }
  }, [logoutIsSuccess])
  

  return (
    <header className="flex justify-between items-center px-14 border-b-2 h-14">
      <div className="logo">
        <Link to="/">My Gallary</Link>
      </div>
      <ul className="flex gap-5">
        <li>
          {userAuthenticate ? (
            <Link onClick={logOutHandler} className="flex items-center gap-3">
              <FaSignOutAlt />
              {logoutIsLoading ? "Logging out..." : "Logout"}
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-3">
              <FaSignInAlt />
              Login
            </Link>
          )}
        </li>
        <li>
          <Link to="/signin" className="flex items-center gap-3">
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
