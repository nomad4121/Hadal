import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import stories from '../assets/stories.json';

export default function StoryScreen() {
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const story = stories[index];

  function nextPage() {
    if (page < story.pages.length - 1) {
      setPage(page + 1);
    } else {
      setIndex((i) => (i + 1) % stories.length);
      setPage(0);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.page}>{story.pages[page]}</Text>
      <Button title="Next Page" onPress={nextPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  page: { fontSize: 18, marginBottom: 20 }
});