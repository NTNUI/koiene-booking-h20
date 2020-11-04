export interface inputData {
  value: string;
}

export interface loginFormData {
  authType: string; // TODO: Remove this
  email: string;
  password: string;
  error: string;
  loading: boolean;
}
