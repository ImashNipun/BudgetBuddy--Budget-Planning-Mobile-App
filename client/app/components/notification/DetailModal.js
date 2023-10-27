import React,{ useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { BlurView } from 'expo-blur'; // install it using 'expo install expo-blur'
import {config} from '../../config/config';  


const DetailModal = ({ isVisible, onClose, data }) => {

  let iconName;
  if (data.mainTitle === 'savings') iconName = 'attach-money';
  else if (data.mainTitle === 'investments') iconName = 'trending-up';
  else iconName = 'label'; // default icon

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const handleCancel = () => {
    setShowFeedbackPopup(true);
  };

  const handleFeedback = async(feedback) => {
    setShowFeedbackPopup(false);
    onClose();
    try {
      const response = await axios.put(`${config.BASE_URL}/api/v1/notification/${data._id}`, {
        helpful: feedback,
      });
  
      if (response?.data?.data && response?.data?.message) {
        Alert.alert('Thank You!', 'Your feedback has been recorded.');
      } else {
        Alert.alert('Error', 'There was an error recording your feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating feedback:', error);
      Alert.alert('Error', 'There was an error recording your feedback. Please try again later.');
    }  
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
        <BlurView
        style={styles.absolute}
        intensity={50} // you can adjust the intensity of the blur
      >
      <View style={styles.modalView}>
        <View style={styles.titleContainer}>
          <MaterialIcons name={iconName} size={30} color="black" />
          <Text style={styles.mainTitle}>{data.mainTitle}</Text>
        </View>
        <Text style={styles.subTitle}>{data.subTitle}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {showFeedbackPopup && (
           <View style={styles.popupView}>
           <View style={styles.whiteBox}>
             <Text style={styles.popupText}>Was this tip helpful?</Text>
             <View style={styles.buttonContainer}>
               <TouchableOpacity
                    style={styles.yesButton} // adjusted style for "Yes" button
                    onPress={() => handleFeedback('yes')}
               >
                 <Text style={styles.feedbackText}>Yes</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    style={styles.noButton} // adjusted style for "No" button
                    onPress={() => handleFeedback('no')}
               >
                 <Text style={styles.feedbackText}>No</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
          )}
      </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    modalView: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20, // To make top-left corner rounded
    borderTopRightRadius: 20, // To make top-right corner rounded
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainTitle: {
    marginLeft: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 20,
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#8274BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },


  popupView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  whiteBox: {
    backgroundColor: 'white', // white background
    padding: 20,
    borderRadius: 10, // optional, for rounded corners
    width: '80%', // or your desired width
    alignItems: 'center',
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  yesButton: {
    backgroundColor: '#8274BC', // purple background for "Yes" button
    padding: 10,
    borderRadius: 5,
  },
  noButton: {
    backgroundColor: 'darkgray', // dark gray background for "No" button
    padding: 10,
    borderRadius: 5,
  },
  feedbackText: {
    color: 'white',
    fontSize: 25,
    marginLeft:20,
    marginRight:20,
  },
  
});

export default DetailModal;
