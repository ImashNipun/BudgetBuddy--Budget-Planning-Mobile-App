import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Card = ({ item }) => {
  const { mainTitle, subTitle, description,shownDate, addedDate } = item;

  let iconName;
  if (mainTitle.toLowerCase() === 'savings') iconName = 'attach-money';
  else if (mainTitle.toLowerCase() === 'investments') iconName = 'trending-up';
  else iconName = 'label'; // default icon

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <MaterialIcons name={iconName} size={24} color="black" />
        <Text style={styles.mainTitle}>{mainTitle}</Text>
        <Text style={styles.addedDate}>{formatDate(shownDate)}</Text>
      </View>
      <Text style={styles.subTitle}>{subTitle}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,  // This ensures that the title takes the available space between the icon and the date
  },
  addedDate: {
    fontSize: 12,
    color: 'grey',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default Card;
