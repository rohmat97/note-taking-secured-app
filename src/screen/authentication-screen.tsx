import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import FingerprintScanner from "react-native-fingerprint-scanner";
import TouchID from "react-native-touch-id";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const AuthenticationScreen = () => {
  const [biometricSupport, setBiometricSupport] = useState(false);
  const { reset } = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    // Check for biometric support
    TouchID.isSupported()
      .then((supported) => {
        if (supported) {
          // Biometric authentication is available
          setBiometricSupport(true);
        }
      })
      .catch((error) => console.log(error));

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
    <View style={styles.conatiner}>
      <TouchableOpacity onPress={authenticateBiometric} style={styles.button}>
        <Text style={styles.buttonText}>Retry Biometric Authentication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    padding: 12,
  },
  button: {
    backgroundColor: "#007AFF", // Background color
    borderRadius: 5, // Optional border radius
    padding: 10, // Optional padding
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 16,
  },
});
