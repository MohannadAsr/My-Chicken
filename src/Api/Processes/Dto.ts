export class createProcessDto {
  handlerId = '' as string;
  createdAt = null as null | Date;
  productsList = [] as { id: string; quantity: number }[];
}

export class updateProcessDto {
  id = '' as string;
  handlerId = '' as string;
  createdAt = null as null | Date;
  productsList = [] as { id: string; quantity: number }[];
}

export class PaginationDto {
  pageSize = 10 as number;
  pageIndex = 1 as number;
  totalPages = 1 as number;
  totalCount = 1 as number;
}

export class processDataDto {
  createdAt = '' as string;
  updatedAt = '' as string;
  id = '' as string;
  handlerId = '' as string;
  handlerName = '' as string;
  productsList = [] as { id: string; quantity: number; productName: string }[];
}

export class processStatsDto {
  id = '' as string;
  name = '' as string;
  totalCount = 0 as number;
}
export class processDto {
  processes = [] as processDataDto[];
  pagination = new PaginationDto() as PaginationDto;
  stats = [] as processStatsDto[];
}

export class filterOptionsDto {
  id = '' as string;
  handlerId = '' as string;
  handlerName = '' as string;
  startDate = null as Date | null;
  productId = [] as string[] | string;
  endDate = null as Date | null;
  pageIndex = 1 as number;
  pageSize = 10 as number;
}
