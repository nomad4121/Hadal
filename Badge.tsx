import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function Badge({ name }: { name: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>🏅 {name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  badge: { backgroundColor: '#ddf', borderRadius: 14, padding: 6, margin: 4 },
  text: { fontWeight: 'bold', color: '#4a4' }
});