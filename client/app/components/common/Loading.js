import React from "react";
import { View, Text, ActivityIndicator, Dimensions,Image } from "react-native";
import logo from "../../../assets/app_logo.png";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: windowHeight,
        width: windowWidth,
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      <ActivityIndicator size="large" color="#00FF99" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
};

export default Loading;
