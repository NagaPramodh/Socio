import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import blackLogo from "../../logo-images/socio--logo.jpeg";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.default}
        p="1rem 6%"
        textAlign="center"
      >
        {/* <Typography fontWeight="bold" fontSize="32px" color="primary">
          Socio
        </Typography> */}
        <img src={blackLogo} alt="logo" height={100} />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
