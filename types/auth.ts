export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  access_expiration: string;
  refresh_expiration: string;
  user: User;
};