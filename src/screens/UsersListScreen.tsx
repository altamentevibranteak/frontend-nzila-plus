import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppNavigation } from '../hooks/navigation';
import * as UserService from '../api/userService';
import { User } from '../types';
import Card from '../components/Card';
import Loading from '../components/Loading';
import ErrorBanner from '../components/ErrorBanner';

const UsersListScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await UserService.listUsers();
      setUsers(res);
    } catch (err: unknown) {
      const msg = require('../utils/error').getErrorMessage(err);
      setError(msg || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={() => navigation.navigate('CargasList')} style={{ paddingHorizontal: 8 }}>
            <Text style={{ color: '#007aff' }}>Cargas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MotoristasList')} style={{ paddingHorizontal: 8 }}>
            <Text style={{ color: '#007aff' }}>Motoristas</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await UserService.listUsers();
      setUsers(res);
    } catch (err: unknown) {
      const msg = require('../utils/error').getErrorMessage(err);
      setError(msg || 'Failed to refresh');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      {error ? <ErrorBanner message={error} /> : null}
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { id: item.id })}>
            <Card>
              <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.meta}>{item.email}</Text>
            </Card>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No users found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});

export default UsersListScreen;
