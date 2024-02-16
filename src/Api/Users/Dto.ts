export class userDto {
  id = '';
  name = '' as string;
  role = '' as 'admin' | 'branch' | 'supplier' | '';
  code = '' as string;
  createdAt = '' as string;
  updatedAt = '' as string;
}

export class addUserDto {
  name = '' as string;
  code = '' as string;
  role = '' as 'admin' | 'branch' | 'supplier';
}
