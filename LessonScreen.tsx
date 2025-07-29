import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import vocabData from '../assets/vocabData';
import SpeechPractice from './SpeechPractice';

// Adaptive difficulty and favorites demo
export default function LessonScreen({ route }) {
  const [index, setIndex] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [wordStats, setWordStats] = useState<{[key:number]: {attempts:number, correct:number}}>({});

  // Adaptive: prioritize words with lowest correct/attempts ratio
  useEffect(() => {
    if (Object.keys(wordStats).length > 10) {
      const sorted = Object.entries(wordStats)
        .sort(([,a],[,b]) => (a.correct/a.attempts) - (b.correct/b.attempts));
      setIndex(Number(sorted[0][0]));
    }
  }, [wordStats]);

  const playAudio = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(vocabData[index].audio);
      await soundObject.playAsync();
    } catch (error) {}
  };

  const nextWord = () => {
    // Adaptive: skip to next least-mastered word
    if (Object.keys(wordStats).length > 10) {
      const sorted = Object.entries(wordStats)
        .sort(([,a],[,b]) => (a.correct/a.attempts) - (b.correct/b.attempts));
      setIndex(Number(sorted[1][0]));
    } else {
      setIndex((idx) => (idx + 1) % vocabData.length);
    }
    setShowPractice(false);
  };

  const toggleFavorite = () => {
    setFavorites(favs =>
      favs.includes(index) ? favs.filter(i => i !== index) : [...favs, index]
    );
  };

  // Receive feedback from SpeechPractice
  const handlePracticeDone = (wasCorrect: boolean) => {
    setWordStats(stats => ({
      ...stats,
      [index]: {
        attempts: (stats[index]?.attempts || 0) + 1,
        correct: (stats[index]?.correct || 0) + (wasCorrect ? 1 : 0)
      }
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.word}>{vocabData[index].word}</Text>
      <Image source={vocabData[index].image} style={styles.image} />
      <Text style={styles.translation}>{vocabData[index].translation}</Text>
      <Button title="Hear Somali" onPress={playAudio} />
      <Button title="Practice Saying It" onPress={() => setShowPractice(true)} />
      <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
        <Text style={{color: favorites.includes(index)? 'gold' : 'gray', fontSize: 24}}>
          ★
        </Text>
      </TouchableOpacity>
      {showPractice && (
        <SpeechPractice word={vocabData[index].word} onPracticeDone={handlePracticeDone} />
      )}
      <Button title="Next Word" onPress={nextWord} />
      <Text style={styles.stats}>
        Attempts: {wordStats[index]?.attempts || 0} | Correct: {wordStats[index]?.correct || 0}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
  word: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  image: { width: 150, height: 150, marginBottom: 8, borderRadius: 16 },
  translation: { fontSize: 20, marginBottom: 16 },
  favoriteBtn: { position: 'absolute', top: 30, right: 30 },
  stats: { marginTop: 6, color: '#666' }
});