import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
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


  const nav = useNavigate();

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
      error.zipcode = "Invalid Zip code"
    }


    if (Object.keys(error).length > 0) {
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
        // console.log("BAD ZIp")
        error.zipcode = "Invalid Zip code"
      }

      return setErrors(error);
    } else {
      nav('/')
    }


  };

  return (
    <div className="containers">
      <div className="left">
        <h2 className="titles">Welcome to the PokeMart!</h2>
        <img className='login-images' src="https://giffiles.alphacoders.com/129/129820.gif" />
      </div>


      <div className="right">
        <h2 className="logintitle">Sign up</h2>
        <div className="signup-details">
          {errors.server && <p>{errors.server}</p>}
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <div className="rows">
                <div>
                  <p className="font">Email:</p>
                  <input
                    className="bigger-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                  <p className="font">Username:</p>
                  <input
                    className="bigger-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                  />

                  {errors.username && <p className="error">{errors.username}</p>}
                </div>
              </div>


            </div>

            <div className="rows">
              <div className="split-input">
                <p className="font">First Name:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={first_name}
                  onChange={(e) => setfname(e.target.value)}
                  required
                  placeholder="First name"
                />

                {errors.first_name && <p className="error">{errors.first_name}</p>}
              </div>

              <div className="split-input">
                <p className="font">Last Name:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={last_name}
                  onChange={(e) => setlname(e.target.value)}
                  required
                  placeholder="Last name"
                />

                {errors.last_name && <p className="error">{errors.last_name}</p>}
              </div>

            </div>


            <div className="rows">

              <div>
                <p className="font">Password:</p>
                <input
                  className="bigger-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />

                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              <div>
                <p className="font">Confirm Password:</p>
                <input
                  className="bigger-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />

                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="rows">

              <div>
                <p className="font">Address:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  required
                  placeholder="Address"
                />

                {errors.address && <p className="error">{errors.address}</p>}
              </div>

              <div>
                <p className="font">City:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="City"
                />

                {errors.city && <p className="error">{errors.city}</p>}
              </div>
            </div>

            <div className="rows">

              <div>
                <p className="font">State:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  placeholder="State"
                />

                {errors.state && <p className="error">{errors.state}</p>}
              </div>

              <div>
                <p className="font">Zip Code:</p>
                <input
                  className="bigger-input"
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  placeholder="Zip Code"
                />

                {errors.zipcode && <p className="error">{errors.zipcode}</p>}
              </div>
            </div>

            <button className="login-button gap-margin font" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFormModal;
