import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import vocabData from '../assets/vocabData';

export default function GameScreen() {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [shuffled, setShuffled] = useState(shuffleWords());

  function shuffleWords() {
    let arr = vocabData.slice(0, 6).sort(() => Math.random() - 0.5); // 6 random words
    return arr;
  }
  function nextRound() {
    setCurrent((c) => (c + 1) % shuffled.length);
  }
  function handleChoice(idx: number) {
    if (shuffled[idx].translation === shuffledshuffled[current].translation) {
      setScore(score + 1);
    }
    nextRound();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the Word!</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.question}>Which one is "{shuffled[current].translation}"?</Text>
      <View style={styles.options}>
        {shuffled.map((item, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleChoice(idx)} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text>{item.word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Restart" onPress={() => { setShuffled(shuffleWords()); setScore(0); setCurrent(0); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 22, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 14 },
  score: { fontSize: 18, marginBottom: 10 },
  question: { fontSize: 18, marginBottom: 16 },
  options: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  card: { alignItems: "center", margin: 8, padding: 8, backgroundColor: "#eef", borderRadius: 8 },
  image: { width: 60, height: 60, marginBottom: 6 }
});