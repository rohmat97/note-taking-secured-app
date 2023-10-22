import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import FingerprintScanner from "react-native-fingerprint-scanner";
import TouchID from "react-native-touch-id";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FloatingButton from "../component/FloatingButton";

const AuthenticationScreen = () => {
  const [biometricSupport, setBiometricSupport] = useState(false);
  const { reset } = useNavigation<NavigationProp<any>>();
  const [biometricError, setBiometricError] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    // Check for biometric support
    TouchID.isSupported()
      .then((supported) => {
        if (supported) {
          // Biometric authentication is available
          setBiometricSupport(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Clean up when the component unmounts
    return () => {
      if (biometricSupport) {
        FingerprintScanner.release();
      }
    };
  }, []);

  useEffect(() => {
    // if (biometricSupport) authenticateBiometric();
  }, [biometricSupport]);

  const authenticateBiometric = () => {
    if (biometricSupport) {
      // For Android (Fingerprint Scanner)
      FingerprintScanner.authenticate({ description: "Scan your fingerprint" })
        .then(() => {
          // Fingerprint authentication successful
          console.log("Fingerprint authentication successful");
        })
        .catch((error) => {
          // Fingerprint authentication failed
          console.log("Fingerprint authentication failed", error);
        });

      // For iOS (Touch ID / Face ID)
      TouchID.authenticate("Authenticate with your biometrics")
        .then((success: any) => {
          if (success) {
            // Biometric authentication successful
            reset({
              index: 0, // The index of the screen you want to navigate to (0 for the first screen, 1 for the second, etc.)
              routes: [{ name: "dashboard" }], // An array of route objects to define the new navigation stack
            });
            console.log("Biometric authentication successful");
          } else {
            setBiometricError("Biometric authentication failed");
            // Biometric authentication failed
            console.log("Biometric authentication failed");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log("Biometric authentication is not supported on this device.");
    }
  };
  const handlePasswordLogin = () => {
    // Perform password-based login logic here
    if (password === "12345") {
      // Password authentication successful
      reset({
        index: 0, // The index of the screen you want to navigate to (0 for the first screen, 1 for the second, etc.)
        routes: [{ name: "dashboard" }], // An array of route objects to define the new navigation stack
      });
      console.log("Password authentication successful");
    } else {
      // Password authentication failed
      console.log("Password authentication failed");
      setBiometricError("Password authentication failed");
    }
  };

  if (!biometricSupport) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Text>Biometric authentication is not supported on this device.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View style={{ rowGap: 32, marginBottom: 32 }}>
        <TouchableOpacity style={styles.button} onPress={handlePasswordLogin}>
          <Text style={styles.buttonText}>Password Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={authenticateBiometric}>
          <Text style={styles.buttonText}>Biometric Login</Text>
        </TouchableOpacity>
        {biometricError ? (
          <Text style={styles.errorText}>{biometricError}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 12,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#6082B6", // Background color
    borderRadius: 5, // Optional border radius
    padding: 10, // Optional padding
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
