declare namespace NodeJS {
  export interface ProcessEnv {
    BACKEND_SERVER_URL: string;
    BACKEND_IMAGE_DOMAIN: string;
    REACT_EDITOR: string;
    ONE_SIGNAL_APP_ID: string;
    ONE_SIGNAL_REST_API_KEY: string;
  }
}
