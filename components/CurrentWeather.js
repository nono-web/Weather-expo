import { isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`;
const CurrentWeather = ({ data }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const currentW = data.list.filter((forecast) => {
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
      const forecastDate = new Date(forecast.dt * 1000);
      return isSameDay(today, forecastDate);
    });
    setCurrentWeather(currentW[0]);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data?.city?.name}</Text>
      <Text style={styles.today}>Aujourd'hui</Text>
      <Image
        source={{ uri: getIcon(currentWeather?.weather[0].icon) }}
        style={styles.image}
      />

      <Text style={styles.temp}>{Math.round(currentWeather?.main.temp)}°C</Text>
      <Text style={styles.description}>
        {currentWeather?.weather[0].description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    marginTop : 60,
    alignItems : "center",
    height : "65%"
  },
  city: {
    fontSize: 36,
    fontWeight: '500',
    color: '#54565B',
  },
 
  today: {
    fontSize: 24,
    fontWeight: '300',
    color: '#54565B',
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  temp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#54565B',
  },
  description: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#54565B',
  },
});

export default CurrentWeather;
