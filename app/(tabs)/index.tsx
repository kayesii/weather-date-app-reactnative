import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export default function HomeScreen() {
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Loading...',
    humidity: '--',
    wind: '--',
  });

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        'https://wttr.in/Nasugbu+Batangas?format=j1'
      );
      const data = await res.json();
      const current = data.current_condition[0];
      setWeather({
        temp: current.temp_C,
        condition: current.weatherDesc[0].value,
        humidity: current.humidity,
        wind: current.windspeedKmph,
      });
    } catch (e) {
      console.log('Weather fetch error:', e);
    }
  };

  useEffect(() => {
    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 60000); // update every minute
    return () => clearInterval(weatherTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <LinearGradient colors={['#5C1020', '#3A0810', '#2A0508']} style={styles.gradient}>
      <StatusBar barStyle="light-content" backgroundColor="#5C1020" />
      <SafeAreaView style={styles.safe}>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.locationPill}>
            <Ionicons name="location-sharp" size={13} color="#D4AF37" />
            <Text style={styles.locationText}>NASUGBU BATANGAS, PH</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="time-outline" size={15} color="#D4AF37" />
              <Text style={styles.cardLabel}>CURRENT TIME</Text>
            </View>
            <Text style={styles.timeText}>{timeStr}</Text>
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={13} color="#888888" />
              <Text style={styles.dateText}>{dateStr}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.questionMark}>{'?'}</Text>
              <Text style={styles.cardLabel}>WEATHER UPDATES</Text>
            </View>
            <Text style={styles.tempText}>{weather.temp}{'\u00B0C'}</Text>
            <Text style={styles.conditionText}>{weather.condition}</Text>
            <View style={styles.weatherBox}>
              <View style={styles.weatherCol}>
                <Text style={styles.weatherLabel}>HUMIDITY</Text>
                <Text style={styles.weatherValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.weatherDivider} />
              <View style={styles.weatherCol}>
                <Text style={styles.weatherLabel}>WIND</Text>
                <Text style={styles.weatherValue}>{weather.wind} km/h</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.brandCard]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="react" size={18} color="#D4AF37" />
              <Text style={styles.cardLabel}>REACT NATIVE</Text>
            </View>
            <Text style={styles.brandName}>SIR MAGS</Text>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <View style={styles.footerContent}>
            <MaterialCommunityIcons name="react" size={13} color="#D4AF37" />
            <Text style={styles.footerText}>
              {' REACT NATIVE \u2022 LIVE MONITORS'}
            </Text>
          </View>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 10,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 24,
    paddingVertical: 9,
    paddingHorizontal: 20,
    gap: 7,
    marginBottom: 6,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 14,
  },
  cardLabel: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  questionMark: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '700',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: '#888888',
    fontSize: 13,
  },
  tempText: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 2,
  },
  conditionText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 18,
  },
  weatherBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  weatherCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  weatherLabel: {
    color: '#888888',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '500',
  },
  weatherValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  weatherDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginVertical: 2,
  },
  brandCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 4,
  },
  footer: {
    paddingBottom: 16,
    paddingTop: 4,
  },
  footerLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
  },
});