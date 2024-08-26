import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ProductCategoryDrop from "./ProductCategory";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <ProductCategoryDrop />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
      </ul>
      {user ? <NavLink to='/cart'>Cart</NavLink> : ""}
    </div>
  );
}

export default Navigation;
