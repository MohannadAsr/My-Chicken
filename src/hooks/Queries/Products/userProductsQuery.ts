import { addProductDto, productDto } from '@src/Api/Products/Dto';
import { PRODUCTS_ENDPOINTS } from '@src/Api/Products/EndPoints';
import { addUserDto, userDto } from '@src/Api/Users/Dto';
import { USER_ENDPOINTS } from '@src/Api/Users/EndPoints';
import { useApi } from '@src/hooks/useApi';
import { useToast } from '@src/hooks/useToast';
import { axiosInstance } from '@src/plugins/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { GET, POST, DELETE } = useApi();
const { toast } = useToast();

const fetchProducts = async () => {
  return (await GET<{ data: productDto[] }>(PRODUCTS_ENDPOINTS.GETAllProducts))
    .data.data as productDto[];
};

const addProduct = async (product: addProductDto) => {
  return await POST(PRODUCTS_ENDPOINTS.GETAllProducts, { ...product });
};

const deletProducts = async (users: string[]) => {
  return await DELETE(PRODUCTS_ENDPOINTS.GETAllProducts, users);
};

const updateProduct = async (product: {
  name: string;
  quantity: number;
  id: string;
}) => {
  return await POST(PRODUCTS_ENDPOINTS.UPDATE, product);
};

export const fetchProductsList = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retryDelay: 5000,
    refetchOnMount: true,
  });
};

export const MutateAddProduct = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: addProductDto) => addProduct(product),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['products'] });
      toast('Done Successfuly', 'success');
    },
  });
};

export const MutateDeleteProducts = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (users: string[]) => deletProducts(users),
    onSuccess: (data) => {
      if (data) {
        QueryClient.invalidateQueries({ queryKey: ['products'] });
        toast('Elemente erfolgreich gelöscht ', 'success');
      }
    },
  });
};

export const MutateUpdateProduct = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: { name: string; quantity: number; id: string }) =>
      updateProduct(product),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['products'] });
      toast('Artikel erfolgreich aktualisiert', 'success');
    },
  });
};
