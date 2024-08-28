import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { thunkAuthenticate } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setfname] = useState("");
  const [last_name, setlname] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setaddress] = useState("");
  const [zipcode, setZip] = useState('');

  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    const zip = zipcode;
    const error = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 50) {
      error.email = "Email must be less than 50 characters"
    }
    if (!emailRegex.test(email) || email.length <= 0) {
      error.email = "Invalid email"
    }
    if (password.length > 255) {
      error.password = "Password is too long!"
    }
    if (password.length < 5) {
      error.password = "Password is too short!"
    }
    if (password.length < 0) {
      error.password = "Password is required"
    }
    if (password !== confirmPassword) {
      error.confirmPassword = "Confirm Password field must be the same as the Password field"
    }
    if (isNaN(Number(zip))) {
      console.log("BAD ZIp")
      error.zipcode = "Invalid Zip code"
    }


    if (Object.keys(error).length > 0) {
      console.log("EERR", error)
      return setErrors(error);
    }



    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        email,
        username,
        password,
        address,
        city,
        state,
        zip,
      }
      ));



    if (serverResponse) {
      // console.log(serverResponse)
      error.server = serverResponse.server;
      error.email = serverResponse.email;
      error.username = serverResponse.username;
      error.zipcode = serverResponse.zip;
      // console.log(serverResponse.username)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.length > 50) {
        error.email = "Email must be less than 50 characters"
      }
      if (!emailRegex.test(email) || email.length <= 0) {
        error.email = "Invalid email"
      }
      if (password.length > 255) {
        error.password = "Password is too long!"
      }
      if (password.length < 0) {
        error.password = "Password is required"
      }
      if (password !== confirmPassword) {
        error.confirmPassword = "Confirm Password field must be the same as the Password field"
      }
      if (isNaN(Number(zip))) {
        console.log("BAD ZIp")
        error.zipcode = "Invalid Zip code"
      }

      return setErrors(error);
    } else {
      navigate("/");
    }


  };

  return (
    <div className="login-page">

      <div className="signup-details">
        <h2 className="title">Sign up for the PokeMart!</h2>
        {errors.server && <p>{errors.server}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <p>Email:</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="name-input">
            <div className="split-input">
              <p>First Name:</p>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setfname(e.target.value)}
                required
                placeholder="First name"
              />

              {errors.first_name && <p className="error">{errors.first_name}</p>}
            </div>

            <div className="split-input">
              <p>Last Name:</p>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setlname(e.target.value)}
                required
                placeholder="Last name"
              />

              {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>

          </div>

          <div>
            <p>Username:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />

            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="name-input">

            <div>
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />

              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div>
              <p>Confirm Password:</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
              />

              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="name-input">

            <div>
              <p>Address:</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                required
                placeholder="Address"
              />

              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div>
              <p>City:</p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
              />

              {errors.city && <p className="error">{errors.city}</p>}
            </div>
          </div>

          <div className="name-input">

            <div>
              <p>State:</p>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="State"
              />

              {errors.state && <p className="error">{errors.state}</p>}
            </div>

            <div>
              <p>Zip Code:</p>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZip(e.target.value)}
                required
                placeholder="Zip Code"
              />

              {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            </div>
          </div>

          <button className="login-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
