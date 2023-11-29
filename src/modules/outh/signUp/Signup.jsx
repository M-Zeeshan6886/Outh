import React from "react";
import styles from "./Signup.module.scss";
import FormInput from "../../../FormInput/FormInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { GIcon, Line, MIcon } from "../../../assets";

const Signup = () => {
  const navigate = useNavigate();
  const validate = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Name should contain only alphabets")
      .min(6, "Name should be at least 6 characters long")
      .required("Name is Required"),
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    password: Yup.string()
      .matches(/\d/, "Password must contain at least 1 numeric character")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .required("Password is Required"),
  });


const handleSubmit = async (values) => {
     try {
       console.log(values);
       const response = await fetch(
          "https://earthcoapi.yehtohoga.com/api/Account/Register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        
       console.log(response);
       if (response.status === 200) {
         // Request was successful, you can handle the success here.
         console.log("Form data was successfully posted to the API");
         // Redirect or perform any other actions on success.
         navigate("/signin");
       } else {
         // Request failed, handle the error here.
         console.error("Invalid Email or Password");
       }
     } catch (error) {
       console.error("An error occurred:", error);
     }
   };
 

  return (
    <>
      <div className={styles.signup_container}>
        <div className={styles.signup_container_left}>
          <div className={styles.signup_container_left_content}>
            <h1>Get Started Now</h1>
            <div className={styles.signup_container_left_content_innerContent}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={validate}
                 onSubmit={handleSubmit} // Add the onSubmit handler
              >
                {(formik) => (
                  <div>
                    <Form>
                      <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        place="Enter your name"
                      />
                      <FormInput
                        label="Email address"
                        name="email"
                        type="email"
                        place="Enter email"
                      />
                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        place="Create your password"
                      />

                      <div
                        className={
                          styles.signup_container_left_content_innerContent_checkField
                        }
                      >
                        <input type="checkbox" />
                        <p>
                          I agree to the
                          <span onClick={() => navigate("/signup")}>
                            terms & policy
                          </span>
                        </p>
                      </div>

                      <button
                        className={
                          styles.signup_container_left_content_innerContent_btn
                        }
                        type="submit"
                      >
                        <h1>Sign Up</h1>
                      </button>
                    </Form>
                  </div>
                )}
              </Formik>
              <div className={styles.signup_container_left_content_orField}>
                <img src={Line} alt="Line" />
              </div>

              <div className={styles.signup_container_left_content_socialIcon}>
                <img src={GIcon} alt="Icon" />
                <img src={MIcon} alt="Icon" />
              </div>

              <p>
                Have an account?
                <span onClick={() => navigate("/signin")}>Sign In</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.signup_container_right}></div>
      </div>
    </>
  );
};

export default Signup;
