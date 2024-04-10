import { useState, useEffect } from "react";
import FormFields from "../../components/loginComponents/formFields";
import FormHeader from "../../components/loginComponents/formHeader";
import FormSubmissionArea from "../../components/loginComponents/formSubmissionArea";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const signupFields = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Name",
  },
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
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

let fieldState = {};
signupFields.forEach((field) => (fieldState[field.id] = ""));

function SignUp() {
  const [signupState, setSignupState] = useState(fieldState);
  const [selectedOption, setSelectedOption] = useState("customer");

  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  useEffect(() => {
    if (token && !(token === "undefined")) {
      navigate("/");
    }
  }, [token]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  async function handleSignUpSubmit() {
    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupState["name"],
          email: signupState["email-address"],
          password: signupState["password"],
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

  const handleSignUpChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <FormHeader formType="SignUp" alternateUrl="/login"></FormHeader>
      <FormFields
        formTypeState={signupState}
        fields={signupFields}
        handleChange={handleSignUpChange}
      ></FormFields>
      <label>
        <input
          type="radio"
          value="customer"
          checked={selectedOption === "customer"}
          onChange={handleOptionChange}
        />
        Sign up as a customer
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          value="manufacturer"
          checked={selectedOption === "manufacturer"}
          onChange={handleOptionChange}
        />
        Sign up as a Manufacturer
      </label>
      <FormSubmissionArea
        formType="SignUp"
        handleSubmit={handleSignUpSubmit}
      ></FormSubmissionArea>
    </div>
  );
}

export default SignUp;
