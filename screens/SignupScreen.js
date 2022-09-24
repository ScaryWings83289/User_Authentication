// Packages Imports
import { useContext, useState } from "react";
import { Alert } from "react-native";

// Components Imports
import AuthContent from "../components/AuthContent";
import CustomLoader from "../components/CustomLoader";

// Context Imports
import { AuthContext } from "../store/auth-context";

// Utils Imports
import { createUser } from "../utils/auth";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  // Handle User Signup
  const handleSignup = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <CustomLoader message='Creating user..' />;
  }

  return <AuthContent onAuthenticate={handleSignup} />;
};

export default SignupScreen;
