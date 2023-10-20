import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';

const SelectOrTakeImageModel = ({ visible, onClose, onTakePicture, onSelectPicture }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "rgba(0, 0, 0, 0.5)", }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 20 }}>Choose an option:</Text>
          <TouchableOpacity onPress={onTakePicture}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Take a Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSelectPicture}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Select a Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 16, color: 'red' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectOrTakeImageModel;
