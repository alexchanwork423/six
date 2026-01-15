
// domain/auth/dto/create-user.dto.ts
export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  provider?: string;
  avatar?: string;
  verified: boolean;
}
