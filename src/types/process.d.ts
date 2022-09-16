declare namespace NodeJS {
  export interface ProcessEnv {
    BACKEND_SERVER_URL: string;
    JWT_SECRET: string;
    REACT_EDITOR: string;
  }
}
