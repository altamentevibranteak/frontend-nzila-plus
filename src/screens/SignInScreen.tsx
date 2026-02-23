import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppNavigation } from '../hooks/navigation';

const SignInScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useAppNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn({ username, password });
    } catch (err: unknown) {
      const msg = require('../utils/error').getErrorMessage(err);
      setError(msg || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nzila Plus</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Input label="Username" value={username} onChangeText={setUsername} />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={handleSignIn} loading={loading} />
      <Button title="Create account" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
});

export default SignInScreen;
