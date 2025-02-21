import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center px-14 border-b-2 h-14">
      <div className="logo">
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul className="flex gap-5">
        <li>
          <Link to='/login' className="flex items-center gap-3">
            <FaSignInAlt />Login
          </Link>
        </li>
        <li>
          <Link to='/signin' className="flex items-center gap-3">
            <FaUser />Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header