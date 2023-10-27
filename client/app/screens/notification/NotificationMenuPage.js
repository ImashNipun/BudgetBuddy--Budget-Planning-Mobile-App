import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import Card from "../../components/notification/Card";
import DetailModal from "../../components/notification/DetailModal";
import * as Notifications from "expo-notifications";
import { config } from "../../config/config"; // Ensure you have imported your config file.
import { useIsFocused } from "@react-navigation/native";

const NotificationMenuPage = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/v1/notification/shown`
        );
        setData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [isFocused, selectedItem]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/v1/notification/top`
        );
        const result = response?.data?.data;

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });

        // Send as local notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: result.mainTitle,
            body: result.subTitle + ": " + result.description,
            data: { id: result._id },
          },
          trigger: null, // send immediately
        });
        console.log("Notification sent", result);
      } catch (error) {
        console.error("Error fetching and sending notification", error);
        return () => clearInterval(intervalId);
      }
    }, 86400000); // 60000ms = 10 minutes

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function getPermissions() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } =
          await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(
            "Notification permissions are required to receive updates."
          );
        }
      }
    }

    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedItem(item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
      {selectedItem && (
        <DetailModal
          isVisible={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          data={selectedItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
});

export default NotificationMenuPage;
