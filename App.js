import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebase } from "./src/firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

/* The if global statement above is used when a version of the firebase package newer than 7.9.0.  
It's sort of a "bug" that they don't seem to intend to fix. 
When you are installing packages, instead of doing npm install ***, 
do expo install ***, that will grab the version of the package that 
is known to work with the version of expo/react native */

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // is run everytime the screen renders combination of lifecycle methods
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      //auth listener because code needs to be run as  soon as its loaded
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        setUser(null);
      }
    });
  }, []); // empty second param is to give it a state variable that you want to run the code, whenever the state is updated. Wth it being empty, the array will only be run once.

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  } // load time is the total amount of time it takes to check whether the user has logged in, in the userEffect

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Tabs" component={Tabs} />
          </> // props takes in anything that the navigator is also using, like navigation
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabs = createBottomTabNavigator();

const Tabs = () => {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name="Tab1"
        initialParams={{ title: "Tab Screen 1" }}
        component={HomeScreen}
      />
      <MainTabs.Screen
        name="Tab2"
        initialParams={{ title: "Tab Screen 2" }}
        component={HomeScreen}
      />
      <MainTabs.Screen
        name="Tab3"
        initialParams={{ title: "Tab Screen 3" }}
        component={HomeScreen}
      />
      <MainTabs.Screen
        name="Tab4"
        initialParams={{ title: "Tab Screen 4" }}
        component={HomeScreen}
      />
    </MainTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "60%",
  },
});
