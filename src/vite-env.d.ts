interface ImportMetaEnv {
  readonly VITE_NAME: string;
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
