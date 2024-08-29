import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import './Layout.css'

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
      <footer>
        <button className="backtotop" onClick={(e) => { e.stopPropagation(); topFunction() }}>Back to top</button>

        <div className="footer">
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffv4k8-1a93b949-05b5-4a4c-8922-ddc787e1bd88.png/v1/fill/w_894,h_894,q_70,strp/pokemon_mart_logo_by_jormxdos_dffv4k8-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdjRrOC0xYTkzYjk0OS0wNWI1LTRhNGMtODkyMi1kZGM3ODdlMWJkODgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.fo5KSBu8CaPht5yqQPsfmRxhuzNRoV6wW53Vz8-02Ss" />

          <h3 className="create-by">Created by: Tyler Kim</h3>
          <a className="references" href="https://www.linkedin.com/in/tylothedino/" style={{ cursor: 'pointer', color: 'white' }}>Linkedin</a>

        </div>
      </footer>
    </>
  );
}
