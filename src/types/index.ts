// Generated types (subset) from Nzila Plus OpenAPI

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive?: boolean;
}

export interface AuthToken {
  token: string;
}

export interface AuthTokenRequest {
  username: string;
  password: string;
}

export type StatusEnum = 'PENDENTE' | 'EM_TRANSITO' | 'ENTREGUE' | 'CANCELADO';
export type TipoServicoEnum = 'IMEDIATO' | 'AGENDADO';
export type CategoriaEnum = 'construcao' | 'mobilia' | 'eletro' | 'outros';
export type TipoUsuarioEnum = 'cliente' | 'motorista';

export interface Carga {
  id: number;
  titulo: string;
  descricao: string;
  peso_kg: string; // decimal as string per API
  foto_carga?: string | null; // uri
  origem: string;
  destino: string;
  origem_coords?: string | null;
  destino_coords?: string | null;
  preco_frete?: string | null;
  status: StatusEnum;
  tipo_servico: TipoServicoEnum;
  data_agendamento?: string | null; // ISO date-time
  acompanhada?: boolean;
  categoria?: CategoriaEnum;
  cliente: number;
  motorista?: number | null;
  data_criacao: string; // ISO date-time
}

export interface CargaRequest {
  titulo: string;
  descricao: string;
  peso_kg: string;
  foto_carga?: string | null; // binary in request, string/uri in client
  origem: string;
  destino: string;
  origem_coords?: string | null;
  destino_coords?: string | null;
  preco_frete?: string | null;
  tipo_servico?: TipoServicoEnum;
  data_agendamento?: string | null;
  acompanhada?: boolean;
  categoria?: CategoriaEnum;
  motorista?: number | null;
}

export interface PatchedCargaRequest {
  titulo?: string;
  descricao?: string;
  peso_kg?: string;
  foto_carga?: string | null;
  origem?: string;
  destino?: string;
  origem_coords?: string | null;
  destino_coords?: string | null;
  preco_frete?: string | null;
  tipo_servico?: TipoServicoEnum;
  data_agendamento?: string | null;
  acompanhada?: boolean;
  categoria?: CategoriaEnum;
  motorista?: number | null;
}

export interface Motorista {
  id: number;
  telefone: string;
  bi: string;
  carta_conducao: string;
  user: number;
  veiculo?: number | null;
}

export interface MotoristaRequest {
  telefone: string;
  bi: string;
  carta_conducao: string;
  user: number;
  veiculo?: number | null;
}

export interface PatchedMotoristaRequest {
  telefone?: string;
  bi?: string;
  carta_conducao?: string;
  user?: number;
  veiculo?: number | null;
}

export interface Register {
  username: string;
  email: string;
  bi: string;
  morada?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  tipo_usuario: TipoUsuarioEnum;
  bi: string;
  telefone: string;
  morada?: string;
  carta_conducao?: string;
}

export interface APIError {
  message: string;
  code?: string;
  details?: Record<string, unknown> | null;
}

export type Nullable<T> = T | null;
