import { Motorista } from '../types';
import * as client from './client';
import config from '../config';
import { mockMotoristas } from './mocks';

const BASE = '/motoristas';

export async function listMotoristas(): Promise<Motorista[]> {
  if (config.USE_MOCK) return Promise.resolve(mockMotoristas);
  return client.get<Motorista[]>(BASE);
}

export async function getMotorista(id: number): Promise<Motorista> {
  if (config.USE_MOCK) return Promise.resolve(mockMotoristas.find((m) => m.id === id) as Motorista);
  return client.get<Motorista>(`${BASE}/${id}`);
}

export async function createMotorista(payload: Partial<Motorista>): Promise<Motorista> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as Motorista), id: Math.floor(Math.random() * 10000) });
  return client.post<Motorista>(BASE, payload);
}

export async function updateMotorista(id: number, payload: Partial<Motorista>): Promise<Motorista> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as Motorista), id });
  return client.put<Motorista>(`${BASE}/${id}`, payload);
}

export async function deleteMotorista(id: number): Promise<void> {
  if (config.USE_MOCK) return Promise.resolve();
  await client.del(`${BASE}/${id}`);
}
