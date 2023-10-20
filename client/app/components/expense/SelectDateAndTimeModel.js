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
      {/* <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>Select Date</Text>
      </TouchableOpacity> */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          type="neutralButtonPressed"
          onChange={handleDateChange}
        />
      )}

      {/* {showTimePicker && (
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text>Select Time</Text>
        </TouchableOpacity>
      )} */}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          //display="default"
          type="neutralButtonPressed"
          onChange={handleTimeChange}
        />
      )}

      {/* You can display the selected date and time wherever needed */}
      <Text>Date: {selectedDate.toDateString()}</Text>
      <Text>Time: {selectedTime.toLocaleTimeString()}</Text>
    </View>
  );
}
