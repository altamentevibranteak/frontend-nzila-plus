import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import * as CargaService from '../api/cargaService';
import Loading from '../components/Loading';
import Card from '../components/Card';
import ErrorBanner from '../components/ErrorBanner';
import { useAppNavigation } from '../hooks/navigation';

const CargasListScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [data, setData] = useState<import('../types').Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { (async () => { setLoading(true); try { setData(await CargaService.listCargas()); } catch (err: unknown) { const msg = require('../utils/error').getErrorMessage(err); setError(msg || 'Failed'); } finally { setLoading(false); } })(); }, []);

  const onRefresh = async () => { setRefreshing(true); try { setData(await CargaService.listCargas()); } catch (err: unknown) { const msg = require('../utils/error').getErrorMessage(err); setError(msg || 'Failed'); } finally { setRefreshing(false); } };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      {error ? <ErrorBanner message={error} /> : null}
      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CargaDetail', { id: item.id })}>
            <Card>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text>{item.origem} → {item.destino}</Text>
            </Card>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No cargas found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, title: { fontWeight: '600' }, empty: { textAlign: 'center', marginTop: 20 } });

export default CargasListScreen;
