import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';

const mascotImg = require('../assets/mascot.png');

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={mascotImg} style={styles.mascot} />
      <Text style={styles.title}>AfriSpeech Somali Kids</Text>
      <Text style={styles.subtitle}>
        Welcome! I'm Hadal, your language buddy. Let's learn Somali together!
      </Text>
      <Button title="Lessons" onPress={() => navigation.navigate('Lesson')} />
      <Button title="Games" onPress={() => navigation.navigate('Game')} />
      <Button title="Stories" onPress={() => navigation.navigate('Story')} />
      <Button title="Progress" onPress={() => navigation.navigate('Progress')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 32 },
  mascot: { width: 80, height: 80, resizeMode: 'contain', margin: 8 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 18 }
});