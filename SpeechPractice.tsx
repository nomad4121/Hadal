import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import Voice from '@react-native-voice/voice';

// Minimal phoneme feedback and visual feedback (waveform stub)
export default function SpeechPractice({
  word,
  onPracticeDone,
}: {
  word: string,
  onPracticeDone?: (wasCorrect:boolean)=>void
}) {
  const [recognized, setRecognized] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [waveAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      const result = event.value[0];
      setRecognized(result);
      // Basic phoneme-level feedback (stub)
      let wasCorrect = result.trim().toLowerCase() === word.trim().toLowerCase();
      setFeedback(wasCorrect
        ? 'Great job! 🎉'
        : phonemeHint(word, result)
      );
      setIsListening(false);
      onPracticeDone && onPracticeDone(wasCorrect);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [word]);

  const startListening = async () => {
    setFeedback('');
    setIsListening(true);
    try {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(waveAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      ).start();
      await Voice.start('so-SO');
    } catch (e) {
      setFeedback('Speech recognition not available.');
      setIsListening(false);
    }
  };

  function phonemeHint(target: string, attempt: string) {
    // Very basic diff: show which letters don't match
    let hint = '';
    for (let i = 0; i < target.length; i++) {
      if (attempt[i] === target[i]) hint += target[i];
      else hint += '_';
    }
    return `Try again! Hint: ${hint}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Say: {word}</Text>
      <Animated.View
        style={[
          styles.waveform,
          { opacity: isListening ? 0.7 : 0.2, transform: [{ scale: waveAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] }
        ]}
      />
      <Button title={isListening ? "Listening..." : "Start Speaking"} onPress={startListening} disabled={isListening} />
      {recognized ? <Text>You said: {recognized}</Text> : null}
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  header: { fontSize: 22, marginBottom: 12 },
  feedback: { color: 'green', marginTop: 8, fontWeight: 'bold', textAlign: 'center' },
  waveform: { backgroundColor: '#3ad', height: 16, width: 120, borderRadius: 10, margin: 12 }
});