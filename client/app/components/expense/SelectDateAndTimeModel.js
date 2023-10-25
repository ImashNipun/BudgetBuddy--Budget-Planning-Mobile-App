import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SelectDateAndTimeModel({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) {
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  return (
    <View>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          type="neutralButtonPressed"
          onChange={handleDateChange}
        />
      )}


      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          //display="default"
          type="neutralButtonPressed"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}
