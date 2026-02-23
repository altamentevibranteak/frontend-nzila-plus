import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as UserService from '../api/userService';
import Loading from '../components/Loading';
import ErrorBanner from '../components/ErrorBanner';
import { User } from '../types';
import { useAppRoute, useAppNavigation } from '../hooks/navigation';

const UserDetailScreen: React.FC = () => {
  const route = useAppRoute<'UserDetail'>();
  const navigation = useAppNavigation();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const u = await UserService.getUser(id);
        setUser(u);
      } catch (err: unknown) {
        const msg = require('../utils/error').getErrorMessage(err);
        setError(msg || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleDelete = () => {
    Alert.alert('Confirm', 'Delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await UserService.deleteUser(id);
          navigation.goBack();
        } catch (err: unknown) {
          const msg = require('../utils/error').getErrorMessage(err);
          Alert.alert('Error', msg || 'Delete failed');
        }
      } }
    ]);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorBanner message={error} />;

  if (!user) return <Text style={styles.empty}>User not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.row}>Username: {user.username}</Text>
      <Text style={styles.row}>Email: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  row: { marginBottom: 6 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  empty: { padding: 16 }
});

export default UserDetailScreen;
