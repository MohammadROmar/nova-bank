export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  role: 'Administrator' | 'Manager';
}
