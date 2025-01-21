import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem('jwtToken', token);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Sign in to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6F7FF',
    padding: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    textAlign: 'center',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: '#5A9BD4',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#B3D9FF',
  },
  input: {
    height: 50,
    backgroundColor: '#D9F0FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B3D9FF',
    color: '#0056b3',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0056b3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#5A9BD4',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0056b3',
    marginLeft: 5,
  },
});

export default LoginScreen;
