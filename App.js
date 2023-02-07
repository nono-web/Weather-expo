import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecats from './components/Forecats';
import { APP_WEATHER} from '@env';

const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_WEATHER}&lang=fr&units=metric`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const locationUser = await location.getCurrentPositionAsync();
      getWeather(locationUser);
    };
    getCoordinates();
  }, []);

  const getWeather = async (userLocation) => {
    try {
      const res = await axios.get(
        API_URL(userLocation.coords.latitude, userLocation.coords.longitude)
      );
      setData(res.data);
      setLoading(false);
    } catch (e) {
      console.log('Erreur');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecats data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E6E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
