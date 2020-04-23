declare type AuthStatus = 'NOT_AUTHENTICATED' | 'FAILED' | 'SUCCEED';

declare interface UserState {
  status: AuthStatus;
  currentUser: AuthedUser | null;
}

declare interface LoginValues {
  email?: string;
  password?: string;
}
declare interface UserUpdateValues {
  email?: string;
  password?: string;
  username?: string;
  image?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  timezone?: string;
  user_skills_attributes?: UserSkill[]
}

declare interface UserContextValue extends UserState {
  check: () => void;
  update: (attributes: UserUpdateValues) => Promise<AuthedUser | undefined>;
}

declare type RequestAction = {
  type: 'AUTHENTICATION_REQUEST';
};
declare type SuccessAction = {
  type: 'AUTHENTICATION_SUCCESS';
  payload: {
    user: AuthedUser;
  };
};

declare type AuthenticationAction =
  | RequestAction
  | SuccessAction
  | FailAction
  | ResetAuthErrorAction
  | LogoutAction;

