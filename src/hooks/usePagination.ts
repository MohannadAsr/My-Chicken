import { PaginationDto } from '@src/Api/Processes/Dto';
import { useState, useMemo } from 'react';

export const usePagination = (
  initialTotalCount: number = 1,
  initialPageSize: number = 4
) => {
  const [pagination, setPagination] = useState({
    totalCount: initialTotalCount,
    pageIndex: 1,
    pageSize: initialPageSize,
    get totalPages() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
  });

  const paginate = <T>(array: T[]): T[] => {
    return array.slice(
      (pagination.pageIndex - 1) * pagination.pageSize,
      pagination.pageIndex * pagination.pageSize
    );
  };

  const resetPagination = () => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageIndex: 1,
    }));
  };

  const changePage = (pageIndex: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageIndex,
    }));
  };

  // Function to update total count
  const updatePaination = (newTotalCount: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      totalPages: Math.ceil(newTotalCount / prevPagination.pageSize),
      totalCount: newTotalCount,
    }));
  };

  const updateServerPaination = (pagination: PaginationDto) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      ...pagination,
    }));
  };

  return {
    pagination,
    setPagination,
    paginate,
    resetPagination,
    changePage,
    updatePaination,
    updateServerPaination,
  };
};
