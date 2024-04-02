import { NavLink } from "react-router-dom";

function FormHeader({ formType, alternateUrl }) {
  const alternateUrlText = formType === "SignUp" ? "Log in" : "Sign Up";

  return (
    <div>
      <div>
        {formType === "Login" ? (
          <p>Please login to your account</p>
        ) : (
          <p>Please create a new account</p>
        )}
      </div>
      <div className="reroute flex flex-row ">
        <div className="rerouteText">
          {formType === "Login" ? (
            <p>Don't have an account? </p>
          ) : (
            <p>Already Have an Account? </p>
          )}
        </div>
        <NavLink
          className='ml-2  lass="font-medium text-blue-600 dark:text-blue-500 hover:underline"'
          to={alternateUrl}
        >
          {alternateUrlText}
        </NavLink>
      </div>
    </div>
  );
}
export default FormHeader;
