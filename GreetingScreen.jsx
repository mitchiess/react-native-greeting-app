// GreetingScreen.jsx — React Native Greeting Application
// Implements: input, validation, greeting display, and styling

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function GreetingScreen() {
  // ── State ─────────────────────────────────────────────────────────
  const [name, setName]         = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError]       = useState('');
  const [fadeAnim]              = useState(new Animated.Value(0));

  // ── Handlers ──────────────────────────────────────────────────────
  const handleNameChange = (text) => {
    setName(text);
    if (error) setError(''); // clear error as soon as user types
  };

  const handleGreet = () => {
    if (!name.trim()) {
      setError('Please enter your name before continuing.');
      return;
    }
    setError('');
    setGreeting(`Hello, ${name.trim()}! Welcome to the app.`);

    // Fade-in animation for the greeting card
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  // ── Render ────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hello App</Text>
        <Text style={styles.subtitle}>Enter your name below</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>YOUR NAME</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="e.g. Maria"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={handleGreet}
        />
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGreet}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Say Hello 👋</Text>
      </TouchableOpacity>

      {/* Greeting Card */}
      {greeting ? (
        <Animated.View style={[styles.greetingCard, { opacity: fadeAnim }]}>
          <Text style={styles.greetingEmoji}>🎉</Text>
          <Text style={styles.greetingText}>{greeting}</Text>
          <Text style={styles.greetingSub}>
            Great to have you here today!
          </Text>
        </Animated.View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  inputSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1E1B4B',
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF8F8',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  greetingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  greetingEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1B4B',
    textAlign: 'center',
  },
  greetingSub: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    textAlign: 'center',
  },
});
