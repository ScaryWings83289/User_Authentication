// Packages Imports
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";

// Context Imports
import { AuthContext } from "../store/auth-context";

const WelcomeScreen = () => {
  const [fetchedMessage, setFetchedMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // Fetch protected resources from firebase
  useEffect(() => {
    axios
      .get(
        `https://user-authentication-987df-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth=${token}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
