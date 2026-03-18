export interface User {
  id: number;
  name: string;
  email: string;
}
export interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}
