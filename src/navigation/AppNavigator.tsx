import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UsersListScreen from '../screens/UsersListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import UserFormScreen from '../screens/UserFormScreen';
import CargasListScreen from '../screens/CargasListScreen';
import CargaDetailScreen from '../screens/CargaDetailScreen';
import CargaFormScreen from '../screens/CargaFormScreen';
import MotoristasListScreen from '../screens/MotoristasListScreen';
import MotoristaDetailScreen from '../screens/MotoristaDetailScreen';
import MotoristaFormScreen from '../screens/MotoristaFormScreen';

export type RootStackParamList = {
  SignIn: undefined;
  Register: undefined;
  UsersList: undefined;
  UserDetail: { id: number };
  UserForm: { id?: number };
  CargasList: undefined;
  CargaDetail: { id: number };
  CargaForm: { id?: number };
  MotoristasList: undefined;
  MotoristaDetail: { id: number };
  MotoristaForm: { id?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // render splash elsewhere if needed

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign in' }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create account' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="UsersList" component={UsersListScreen} options={{ title: 'Users' }} />
            <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User' }} />
            <Stack.Screen name="UserForm" component={UserFormScreen} options={{ title: 'User Form' }} />
            <Stack.Screen name="CargasList" component={CargasListScreen} options={{ title: 'Cargas' }} />
            <Stack.Screen name="CargaDetail" component={CargaDetailScreen} options={{ title: 'Carga' }} />
            <Stack.Screen name="CargaForm" component={CargaFormScreen} options={{ title: 'Create / Edit Carga' }} />
            <Stack.Screen name="MotoristasList" component={MotoristasListScreen} options={{ title: 'Motoristas' }} />
            <Stack.Screen name="MotoristaDetail" component={MotoristaDetailScreen} options={{ title: 'Motorista' }} />
            <Stack.Screen name="MotoristaForm" component={MotoristaFormScreen} options={{ title: 'Create / Edit Motorista' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export default AppNavigator;
