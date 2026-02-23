import { User } from '../types';
import * as client from './client';
import config from '../config';
import { mockUsers } from './mocks';

const BASE = '/users';

export async function listUsers(): Promise<User[]> {
  if (config.USE_MOCK) return Promise.resolve(mockUsers);
  return client.get<User[]>(BASE);
}

export async function getUser(id: number): Promise<User> {
  if (config.USE_MOCK) return Promise.resolve(mockUsers.find((u) => u.id === id) as User);
  return client.get<User>(`${BASE}/${id}`);
}

export async function createUser(payload: Partial<User>): Promise<User> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as User), id: Math.floor(Math.random() * 10000) });
  return client.post<User>(BASE, payload);
}

export async function updateUser(id: number, payload: Partial<User>): Promise<User> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as User), id });
  return client.put<User>(`${BASE}/${id}`, payload);
}

export async function deleteUser(id: number): Promise<void> {
  if (config.USE_MOCK) return Promise.resolve();
  await client.del(`${BASE}/${id}`);
}

export async function login(username: string, password: string): Promise<{ token: string; user: User }> {
  if (config.USE_MOCK) {
    const user = mockUsers[0];
    return Promise.resolve({ token: 'mock-token-123', user });
  }
  const authToken = await client.post<{ token: string }>('/api/login/', { username, password });
  // after login, backend may return token only; client code should fetch current user separately if needed
  return { token: authToken.token, user: mockUsers[0] };
}

export async function register(payload: Partial<User> | unknown): Promise<void> {
  if (config.USE_MOCK) return Promise.resolve();
  await client.post('/api/register/', payload as any);
}
