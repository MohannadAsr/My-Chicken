import { addUserDto, userDto } from '@src/Api/Users/Dto';
import { USER_ENDPOINTS } from '@src/Api/Users/EndPoints';
import { useApi } from '@src/hooks/useApi';
import { useToast } from '@src/hooks/useToast';
import { axiosInstance } from '@src/plugins/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const { GET, POST, DELETE } = useApi();
const { toast } = useToast();

const fetchUsers = async () => {
  return (await GET<{ data: any }>(USER_ENDPOINTS.GETALLUSERS)).data
    .data as userDto[];
};

const addUser = async (user: addUserDto) => {
  return await POST(USER_ENDPOINTS.GETALLUSERS, { ...user });
};

const deletUsers = async (users: string[]) => {
  const result = await DELETE(USER_ENDPOINTS.GETALLUSERS, users);
  return result;
};

const updateUser = async (user: { name: string; code: string; id: string }) => {
  const response = await POST(USER_ENDPOINTS.UPDATE, user);
  return response.data.user;
};

export const fetchUsersList = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    retryDelay: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const MutateAddUser = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: addUserDto) => addUser(user),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Done Successfuly', 'success');
    },
  });
};

export const MutateDeleteUsers = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (users: string[]) => deletUsers(users),
    onSuccess: (data: any) => {
      if (data) {
        QueryClient.invalidateQueries({ queryKey: ['users'] });
        toast('Elemente erfolgreich gelöscht', 'success');
      }
    },
  });
};

export const MutateUpdateUser = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: { name: string; code: string; id: string }) =>
      updateUser(user),
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Artikel erfolgreich aktualisiert', 'success');
    },
  });
};
