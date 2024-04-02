import { useEffect, useState } from "react";
import FormFields from "../../components/loginComponents/formFields";
import FormHeader from "../../components/loginComponents/formHeader";
import FormSubmissionArea from "../../components/loginComponents/formSubmissionArea";
import { useNavigate } from "react-router-dom";

const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];
let fieldState = {};
loginFields.forEach((field) => (fieldState[field.id] = ""));

function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(fieldState);
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  async function handleLoginSubmit() {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginState["email-address"],
          password: loginState["password"],
        }),
      });
      const res = await response.json();
      console.log(res.access_token);
      localStorage.setItem("access_token", res.access_token);
      setToken(res.access_token);
    } catch (e) {
      console.log(e);
    }
  }

  const handleLoginChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <FormHeader formType="Login" alternateUrl="/signup"></FormHeader>
      <FormFields
        formTypeState={loginState}
        fields={loginFields}
        handleChange={handleLoginChange}
      ></FormFields>
      <FormSubmissionArea
        formType="Login"
        handleSubmit={handleLoginSubmit}
      ></FormSubmissionArea>
    </div>
  );
}

export default Login;
