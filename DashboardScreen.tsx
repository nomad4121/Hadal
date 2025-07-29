import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// Parental/teacher controls, schedules, and analytics stub
export default function DashboardScreen() {
  // TODO: Add real schedule/analytics state and logic
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Monitor progress, set schedules, and customize learning.</Text>
      <Button title="Export Progress Report" onPress={()=>alert('Report exported! (stub)')} />
      <Button title="Set Practice Schedule" onPress={()=>alert('Schedule set! (stub)')} />
      <Button title="View Usage Analytics" onPress={()=>alert('Analytics coming soon')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap:12 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});