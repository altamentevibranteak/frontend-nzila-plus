import { Carga } from '../types';
import * as client from './client';
import config from '../config';
import { mockCargas } from './mocks';

const BASE = '/cargas';

export async function listCargas(): Promise<Carga[]> {
  if (config.USE_MOCK) return Promise.resolve(mockCargas);
  return client.get<Carga[]>(BASE);
}

export async function getCarga(id: number): Promise<Carga> {
  if (config.USE_MOCK) return Promise.resolve(mockCargas.find((c) => c.id === id) as Carga);
  return client.get<Carga>(`${BASE}/${id}`);
}

export async function createCarga(payload: Partial<Carga>): Promise<Carga> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as Carga), id: Math.floor(Math.random() * 10000), createdAt: new Date().toISOString() });
  return client.post<Carga>(BASE, payload);
}

export async function updateCarga(id: number, payload: Partial<Carga>): Promise<Carga> {
  if (config.USE_MOCK) return Promise.resolve({ ...(payload as Carga), id });
  return client.put<Carga>(`${BASE}/${id}`, payload);
}

export async function deleteCarga(id: number): Promise<void> {
  if (config.USE_MOCK) return Promise.resolve();
  await client.del(`${BASE}/${id}`);
}
