export class User {
  userId: number = 0;
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number = 0;
  organiztion?: string;
  designation?: string;
  profileImageLocation?: string;
  signatureImageLocation?: string;

  constructor() {}
}
