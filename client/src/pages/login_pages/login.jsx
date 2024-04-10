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
  const [selectedOption, setSelectedOption] = useState("customer");

  useEffect(() => {
    if (token && !(token === "undefined")) {
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
          user_type: selectedOption,
        }),
      });

      const res = await response.json();
      console.log(res.access_token);
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("user_type", res.user_type);

      setToken(res.access_token);
    } catch (e) {
      console.log(e);
    }
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
      <label>
        <input
          type="radio"
          value="customer"
          checked={selectedOption === "customer"}
          onChange={handleOptionChange}
        />
        Login as a customer
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          value="manufacturer"
          checked={selectedOption === "manufacturer"}
          onChange={handleOptionChange}
        />
        Login as a Manufacturer
      </label>
      <FormSubmissionArea
        formType="Login"
        handleSubmit={handleLoginSubmit}
      ></FormSubmissionArea>
    </div>
  );
}

export default Login;
