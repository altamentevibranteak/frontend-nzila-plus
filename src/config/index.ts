import Constants from 'expo-constants';

const env = (key: string, fallback?: string) => {
  // Prefer process.env for Codespaces/CI; fall back to expo constants extra
  const fromProc = (globalThis as any).process?.env?.[key];
  if (fromProc !== undefined) return fromProc;
  // extra may contain values
  const manifest = Constants.manifest as unknown as Record<string, unknown> | undefined;
  const expoConfig = Constants.expoConfig as unknown as Record<string, unknown> | undefined;
  const extra = (manifest && (manifest.extra as unknown)) || (expoConfig && (expoConfig.extra as unknown));
  if (extra && (extra as Record<string, unknown>)[key] !== undefined) return String((extra as Record<string, unknown>)[key]);
  return fallback;
};

export const API_URL = env('API_URL', 'https://unsyndicated-sharyl-unrequisite.ngrok-free.dev');
export const USE_MOCK = (env('USE_MOCK', 'true') || 'true') === 'true';

export default {
  API_URL,
  USE_MOCK,
};
