export type UserData = {
  userId: string;
  accessToken: string;
  role: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

type UserState = {
  isLoading: boolean;
  data: UserData | null;
};

export default UserState;

export type UserDataResponse = {
  userId: string;
  jwtToken: string;
  role: string;
};
