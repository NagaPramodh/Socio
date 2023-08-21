import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  userName: "",
  email: "",
  password: "",
  location: "",
  phoneNumber: "",
  occupation: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    // const formData = new FormData();

    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    // console.log(formData);
    // formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch("http://localhost:7500/auth/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();

    onSubmitProps.resetForm();
    console.log(savedUser);
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:7500/auth/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.accessToken,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={Boolean(touched.userName) && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
        // <div className="section">
        //   <div className="container">
        //     <div className="row full-height justify-content-center">
        //       <div className="col-12 text-center align-self-center py-5">
        //         <div className="section pb-5 pt-5 pt-sm-2 text-center">
        //           <h6 className="mb-0 pb-3">
        //             <span>Log In </span>
        //             <span>Sign Up</span>
        //           </h6>
        //           <input
        //             className="checkbox"
        //             type="checkbox"
        //             id="reg-log"
        //             name="reg-log"
        //           />
        //           {/* <label for="reg-log"></label> */}
        //           <div className="card-3d-wrap mx-auto">
        //             <div className="card-3d-wrapper">
        //               <div className="card-front">
        //                 <div className="center-wrap">
        //                   <div className="section text-center">
        //                     <h4 className="mb-4 pb-3">Log In</h4>
        //                     <div className="form-group">
        //                       {/* <input
        //                         type="email"
        //                         className="form-style"
        //                         placeholder="Email"
        //                         name="email"
        //                         // value={signInUserData.email}
        //                         // onChange={handleSignInChange}
        //                       /> */}
        //                       <TextField
        //                         label="Email"
        //                         onBlur={handleBlur}
        //                         onChange={handleChange}
        //                         value={values.email}
        //                         name="email"
        //                         error={
        //                           Boolean(touched.email) &&
        //                           Boolean(errors.email)
        //                         }
        //                         helperText={touched.email && errors.email}
        //                         sx={{ gridColumn: "span 4" }}
        //                       />
        //                       <i className="input-icon uil uil-at"></i>
        //                     </div>
        //                     <div className="form-group mt-2">
        //                       {/* <input
        //                         type="password"
        //                         className="form-style"
        //                         name="password"
        //                         placeholder="Password"
        //                         // value={signInUserData.password}
        //                         // onChange={handleSignInChange}
        //                       /> */}

        //                       <TextField
        //                         label="Password"
        //                         type="password"
        //                         onBlur={handleBlur}
        //                         onChange={handleChange}
        //                         value={values.password}
        //                         name="password"
        //                         error={
        //                           Boolean(touched.password) &&
        //                           Boolean(errors.password)
        //                         }
        //                         helperText={touched.password && errors.password}
        //                         sx={{ gridColumn: "span 4" }}
        //                       />
        //                       <i className="input-icon uil uil-lock-alt"></i>
        //                     </div>
        //                     {/* <a
        //                       href="http://localhost:3000/"
        //                       className="btn mt-4"
        //                       // onClick={handleSignInSubmit}
        //                     >
        //                       Login
        //                     </a> */}
        //                     <Button
        //                       fullWidth
        //                       type="submit"
        //                       sx={{
        //                         m: "2rem 0",
        //                         p: "1rem",
        //                         backgroundColor: palette.primary.main,
        //                         color: palette.background.alt,
        //                         "&:hover": { color: palette.primary.main },
        //                       }}
        //                     >
        //                       {isLogin ? "LOGIN" : "REGISTER"}
        //                     </Button>
        //                     <p className="mb-0 mt-4 text-center">
        //                       <a href="http://localhost:3000/" className="link">
        //                         Forgot your password?
        //                       </a>
        //                     </p>
        //                   </div>
        //                 </div>
        //               </div>
        //               <div className="card-back">
        //                 <div className="center-wrap">
        //                   <div className="section text-center">
        //                     <h4 className="mb-3 pb-3">Sign Up</h4>
        //                     <div className="form-group">
        //                       <input
        //                         type="text"
        //                         name="userName"
        //                         className="form-style"
        //                         placeholder="Full Name"
        //                         // value={signUpUserData.userName}
        //                         // onChange={handleRegisterChange}
        //                       />
        //                       <i className="input-icon uil uil-user"></i>
        //                     </div>
        //                     <div className="form-group mt-2">
        //                       <input
        //                         type="tel"
        //                         name="phoneNumber"
        //                         className="form-style"
        //                         placeholder="Phone Number"
        //                         // value={signUpUserData.phoneNumber}
        //                         // onChange={handleRegisterChange}
        //                       />
        //                       <i className="input-icon uil uil-phone"></i>
        //                     </div>
        //                     <div className="form-group mt-2">
        //                       <input
        //                         type="email"
        //                         name="email"
        //                         className="form-style"
        //                         placeholder="Email"
        //                         // value={signUpUserData.email}
        //                         // onChange={handleRegisterChange}
        //                       />
        //                       <i className="input-icon uil uil-at"></i>
        //                     </div>
        //                     <div className="form-group mt-2">
        //                       <input
        //                         type="password"
        //                         name="password"
        //                         className="form-style"
        //                         placeholder="Password"
        //                         // value={signUpUserData.password}
        //                         // onChange={handleRegisterChange}
        //                       />
        //                       <i className="input-icon uil uil-lock-alt"></i>
        //                     </div>
        //                     <a
        //                       href="http://localhost:3000/"
        //                       className="btn mt-4"
        //                       // onClick={handleRegisterSubmit}
        //                     >
        //                       Register
        //                     </a>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </Formik>
  );
};

export default Form;
