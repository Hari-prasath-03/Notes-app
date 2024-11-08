import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { login, register } from "../utils/dbUtils";
import eyeIcon from "../assets/eye.svg";

const AuthPopup = () => {
  const { setIsAuthPopupShown } = useContext(NotesContext);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);

  const handlePopupClose = () => {
    setIsAuthPopupShown(false);
  };

  return (
    <div className="auth-popup">
      {openLoginForm && <LoginForm />}
      {openRegisterForm && <RegisterForm />}
      {!openLoginForm && !openRegisterForm && (
        <>
          <div className="font-mono font-medium tracking-tighter">
            Already have an account?{" "}
            <button
              onClick={() => setOpenLoginForm(true)}
              className="underline"
            >
              Login
            </button>
          </div>
          <div className="font-mono font-medium tracking-tighter">
            Want to create an account?{" "}
            <button
              onClick={() => setOpenRegisterForm(true)}
              className="underline"
            >
              Register
            </button>
          </div>
        </>
      )}
      <div className="space-x-5 font-mono tracking-tighter">
        {(openLoginForm || openRegisterForm) && (
          <button
            onClick={() => {
              if (openLoginForm) {
                setOpenLoginForm(false);
                setOpenRegisterForm(true);
              } else {
                setOpenLoginForm(true);
                setOpenRegisterForm(false);
              }
            }}
            className="underline font-medium"
          >
            {!openLoginForm ? "Login" : "Register"}
          </button>
        )}
        <button
          onClick={handlePopupClose}
          className="bg-gray-200 text-black font-semibold px-3 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;

const LoginForm = () => {
  const { setUser, setIsAuthPopupShown } = useContext(NotesContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [inputType, setInputType] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const response = await login(formData);
    if (response.userId) {
      setUser(response.userId);
      localStorage.setItem("userId", response.userId);
    }
    setIsAuthPopupShown(false);
  };

  return (
    <div className="flex flex-col gap-3 mb-2">
      <input
        className="form-inp"
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="relative">
        <input
          className="form-inp"
          type={inputType}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <img
          onClick={() => {
            inputType === "password"
              ? setInputType("text")
              : setInputType("password");
          }}
          className="absolute top-2 right-2 size-[15px] cursor-pointer"
          src={eyeIcon}
          alt="eye"
        />
      </div>
      {formData.email && formData.password && (
        <button onClick={handleFormSubmit} className="form-btn">
          Login
        </button>
      )}
    </div>
  );
};

const RegisterForm = () => {
  const { setUser, setIsAuthPopupShown } = useContext(NotesContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputType, setInputType] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const response = await register(formData);
    if (response.userId) {
      setUser(response.userId);
      localStorage.setItem("userId", response.userId);
    }
    setIsAuthPopupShown(false);
  };

  return (
    <div className="flex flex-col gap-3 mb-2">
      <input
        className="form-inp"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="form-inp"
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <div className="relative">
        <input
          className="form-inp"
          type={inputType}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <img
          onClick={() => {
            inputType === "password"
              ? setInputType("text")
              : setInputType("password");
          }}
          className="absolute top-2 right-2 size-[15px] cursor-pointer"
          src={eyeIcon}
          alt="eye"
        />
      </div>
      {formData.name && formData.email && formData.password && (
        <button onClick={handleFormSubmit} className="form-btn">
          Register
        </button>
      )}
    </div>
  );
};
