import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Weather from './Weather';

const Forecats = ({ data }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const forecastData = data.list.map((f) => {
      const dt = new Date(f.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, 'EEEE', { locale: fr }),
      };
    });
    setForecast(forecastData);
  }, [data]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {forecast.map((f) => (
        <View>
          <Weather forecast={f} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    height: '35%',
  },
});

export default Forecats;
