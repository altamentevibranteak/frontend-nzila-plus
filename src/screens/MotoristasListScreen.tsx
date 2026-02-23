import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import * as MotoristaService from '../api/motoristaService';
import Loading from '../components/Loading';
import Card from '../components/Card';
import { useAppNavigation } from '../hooks/navigation';
import { Motorista } from '../types';

const MotoristasListScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [data, setData] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { (async () => { setLoading(true); try { setData(await MotoristaService.listMotoristas()); } catch (e) {} finally { setLoading(false); } })(); }, []);

  const onRefresh = async () => { setRefreshing(true); try { setData(await MotoristaService.listMotoristas()); } catch (e) {} finally { setRefreshing(false); } };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MotoristaDetail', { id: item.id })}>
            <Card>
              <Text style={styles.title}>{item.telefone}</Text>
              <Text>{item.bi}</Text>
            </Card>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.empty}>No drivers found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 12 }, title: { fontWeight: '600' }, empty: { textAlign: 'center', marginTop: 20 } });

export default MotoristasListScreen;
