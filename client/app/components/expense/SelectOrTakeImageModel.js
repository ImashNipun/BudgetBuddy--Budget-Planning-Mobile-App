import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const SelectOrTakeImageModel = ({
  visible,
  onClose,
  onTakePicture,
  onSelectPicture,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            Choose an option:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={onTakePicture}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="camera" size={20} color="#000" />
              <Text style={{ fontSize: 16 }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSelectPicture}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 25,
                backgroundColor: "#f2f2f2",
                borderRadius: 10,
              }}
            >
              <FontAwesome5 name="images" size={20} color="#000" />
              <Text style={{ fontSize: 16 }}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#ff5c5c",
                borderRadius: 10,
                marginTop: 20,
              }}>
            <Text style={{ fontSize: 16, color: "#fff" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectOrTakeImageModel;
