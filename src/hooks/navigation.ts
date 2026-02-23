import { useNavigation as useRNNavigation, useRoute as useRNRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

export type AppNavProp = NativeStackNavigationProp<RootStackParamList>;

export function useAppNavigation() {
  return useRNNavigation<AppNavProp>();
}

export function useAppRoute<T extends keyof RootStackParamList>() {
  return useRNRoute<RouteProp<RootStackParamList, T>>();
}
