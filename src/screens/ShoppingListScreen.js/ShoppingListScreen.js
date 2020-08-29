import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  StatusBar,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import Swiper from "react-native-swiper";

export default function ShoppingListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347"
        >
          <View style={styles.slide}>
            <Image
              source={require("../assets/food-banner1.jpg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../assets/food-banner2.jpg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
}
