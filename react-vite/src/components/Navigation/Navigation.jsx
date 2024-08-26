import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ProductCategoryDrop from "./ProductCategory";
import "./Navigation.css";


function Navigation() {
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
      <NavLink to='/cart'>Cart</NavLink>
    </div>
  );
}

export default Navigation;
