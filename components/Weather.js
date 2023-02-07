
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const Weather = ({ forecast}) => {
    return (
        <View style={styles.container}>
              <Text>{forecast.name}</Text>
        <Text>{forecast.hour}h</Text>
        <Image
        source={{ uri: getIcon(forecast?.icon) }}
        style={styles.image}
      />
        <Text>{forecast.temp}°C</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor : "white",
        height : 140,
        width : 75,
        paddingVertical : 6,
        justifyContent : "center",
        alignItems : 'center',
        marginRight: 10,
        borderRadius : 50
    },
    image: {
        width: 50,
        height: 50,
      },
      temp: {
        fontSize: 18,
        fontWeight: 'bold',
      },
  });


export default Weather