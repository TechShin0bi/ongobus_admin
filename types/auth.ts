export type User = {
  id: number | string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  agency_details: {
    id: number;
    created_at: string;
    updated_at: string;
    user: number;
    branch: number;
    branch_details: {
      id: number;
      name: string;
      agency: number;
      agency_name: string;
    };
    role: number;
    role_details: {
      id: number;
      name: string;
      code: string;
    };
    is_active: boolean;
    date_joined: string;
  };
};

export type AuthResponse = {
  access: string;
  refresh: string;
  access_expiration: string;
  refresh_expiration: string;
  user: User;
};