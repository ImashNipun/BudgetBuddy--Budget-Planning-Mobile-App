import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import React from "react";
import logo from "../../assets/app_logo2.png";
import heroimage from "../../assets/buget_hero.png";
import useAuth from "../hooks/useAuth";
import Loading from "../components/common/Loading";

const BudgetAddIntroScreen = ({ navigation }) => {
  const { auth, onLogout, mainLoadingVisible, isBudgetExsist } = useAuth();
  return (
    <>
      {mainLoadingVisible && <Loading />}

      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
        <View style={styles.container}>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />

          <Image source={heroimage} style={styles.relatedImage} />

          <Text style={styles.title}>Begin Your Budgeting Adventure</Text>

          <Text style={styles.introText}>
            Welcome to Budget Buddy! Get ready to transform the way you manage
            your money. Our easy and personalized budget setup will pave the way
            for a more financially secure future. Let's dive in and shape your
            financial journey together!
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("BudgetSetup")}
          >
            <Text style={styles.buttonText}>Setup My Budget</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  relatedImage: {
    width: 300,
    height: 250,
    resizeMode: "contain",
    marginBottom: 50,
  },
  title: {
    width: "90%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  introText: {
    width: "90%",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  addButton: {
    width: "80%",
    backgroundColor: "#8373C1",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BudgetAddIntroScreen;
