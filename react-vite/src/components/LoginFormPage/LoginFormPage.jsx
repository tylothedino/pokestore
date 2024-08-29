import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import DemoLogin from "./DemoLogin";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <h2 className="title">Welcome to the PokeMart!</h2>
        <img className="login-image" src="https://steamuserimages-a.akamaihd.net/ugc/1469813569889500026/79499A1D2C041DB4CFF6D27D5F7A4FCC969C5E5F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

      </div>
      <div className="right">
        <h1 className="login-title">Log In</h1>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form className="form" onSubmit={handleSubmit}>
          <div className="email">
            {errors.email && <p className="error">{errors.email}</p>}
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="password">
            {errors.password && <p className="error">{errors.password}</p>}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Log In</button>
          <DemoLogin />
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
