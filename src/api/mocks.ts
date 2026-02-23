import { User, Carga, Motorista } from '../types';

export const mockUsers: User[] = [
  { id: 1, username: 'jdoe', email: 'jdoe@example.com', firstName: 'John', lastName: 'Doe', isActive: true },
  { id: 2, username: 'asmith', email: 'asmith@example.com', firstName: 'Alice', lastName: 'Smith', isActive: true },
];

export const mockCargas: Carga[] = [
  { id: 1, titulo: 'Carga A', descricao: 'Descrição A', peso_kg: '100', origem: 'Maputo', destino: 'Beira', status: 'PENDENTE', tipo_servico: 'IMEDIATO', cliente: 1, data_criacao: new Date().toISOString() },
  { id: 2, titulo: 'Carga B', descricao: 'Descrição B', peso_kg: '200', origem: 'Nampula', destino: 'Tete', status: 'PENDENTE', tipo_servico: 'IMEDIATO', cliente: 1, data_criacao: new Date().toISOString() },
];

export const mockMotoristas: Motorista[] = [
  { id: 1, telefone: '+258820000001', bi: 'A12345', carta_conducao: 'A12345', user: 1 },
  { id: 2, telefone: '+258820000002', bi: 'B67890', carta_conducao: 'B67890', user: 2 },
];
