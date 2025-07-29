import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const badges = [
  { id: 1, name: 'Starter', check: (s:ProgressState) => s.wordsLearned >= 1 },
  { id: 2, name: 'Word Master', check: (s:ProgressState) => s.wordsLearned >= 10 },
  { id: 3, name: 'Super Speaker', check: (s:ProgressState) => s.perfectPronunciations >= 5 },
  { id: 4, name: 'Streak Star', check: (s:ProgressState) => s.streak >= 3 },
  { id: 5, name: 'Favorite Finder', check: (s:ProgressState) => s.favorites >= 5 },
];

type ProgressState = {
  wordsLearned: number,
  perfectPronunciations: number,
  streak: number,
  favorites: number,
  lastPractice: string, // date string
};

export default function ProgressScreen() {
  // These would be computed from real app state or backend
  const [progress, setProgress] = useState<ProgressState>({
    wordsLearned: 12,
    perfectPronunciations: 7,
    streak: 4,
    favorites: 6,
    lastPractice: "2025-07-28"
  });

  const earnedBadges = badges.filter(b => b.check(progress));

  // Daily goal stub
  const dailyGoal = 5;
  const todayPracticed = 4; // stub

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text>Words Learned: {progress.wordsLearned}</Text>
      <Text>Streak: {progress.streak} days</Text>
      <Text>Favorites: {progress.favorites}</Text>
      <Text>Daily Goal: {todayPracticed}/{dailyGoal} words practiced</Text>
      <Text style={styles.subtitle}>Badges</Text>
      <FlatList
        data={earnedBadges}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.badge}>🏅 {item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 18, marginTop: 18, marginBottom: 10 },
  badge: { fontSize: 16, color: 'green', marginBottom: 4 }
});