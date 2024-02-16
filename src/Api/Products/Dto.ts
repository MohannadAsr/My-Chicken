export class productDto {
  id = '';
  name = '' as string;
  quantity = '' as string;
  createdAt = '' as string;
  updatedAt = '' as string;
}

export class addProductDto {
  name = '' as string;
  quantity = 0 as number;
}
