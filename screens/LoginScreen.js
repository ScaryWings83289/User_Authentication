// Packages Imports
import { useContext, useState } from "react";
import { Alert } from "react-native";

// Components Imports
import AuthContent from "../components/AuthContent";
import CustomLoader from "../components/CustomLoader";

// Context Imports
import { AuthContext } from "../store/auth-context";

// Utils Imports
import { loginUser } from "../utils/auth";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  // Handle User Login
  const handleLogin = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <CustomLoader message='Logging you in..' />;
  }

  return <AuthContent isLogin onAuthenticate={handleLogin} />;
};

export default LoginScreen;
