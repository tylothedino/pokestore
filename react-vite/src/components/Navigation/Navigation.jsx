import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ProductCategoryDrop from "./ProductCategory";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const nav = useNavigate();

  return (
    <div className="parent">
      <div className="main-bar">
        <div className="homebutton" onClick={(e) => { e.stopPropagation(); nav('/'); }}>
          <h3 className="logo" >PokeMart</h3>
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffv4k8-1a93b949-05b5-4a4c-8922-ddc787e1bd88.png/v1/fill/w_894,h_894,q_70,strp/pokemon_mart_logo_by_jormxdos_dffv4k8-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdjRrOC0xYTkzYjk0OS0wNWI1LTRhNGMtODkyMi1kZGM3ODdlMWJkODgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.fo5KSBu8CaPht5yqQPsfmRxhuzNRoV6wW53Vz8-02Ss" className="logo-img"></img>
        </div>

        <div className="user-options">
          <div>
            <ProfileButton />
          </div>

          <div>
            {user ? <img className="profile-icon" src="https://cdn-icons-png.flaticon.com/512/4564/4564300.png" onClick={(e) => { e.stopPropagation(); nav('/cart') }} /> : ""}
          </div>
        </div>
      </div>

      <div className="category">
        <ProductCategoryDrop />
      </div>
    </div>
  );
}

export default Navigation;
