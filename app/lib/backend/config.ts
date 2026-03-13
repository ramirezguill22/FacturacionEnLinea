const defaultBackendApiBaseUrl = "http://localhost:8080";

export function getBackendApiBaseUrl(): string {
  return process.env.BACKEND_API_BASE_URL?.trim() || defaultBackendApiBaseUrl;
}