import {
  createProcessDto,
  filterOptionsDto,
  processDataDto,
  processDto,
  updateProcessDto,
} from '@src/Api/Processes/Dto';
import { PROCESSES_API } from '@src/Api/Processes/EndPoints';
import { useApi } from '@src/hooks/useApi';
import { useToast } from '@src/hooks/useToast';
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { isString } from 'formik';

const { GET, POST, DELETE } = useApi();
const { toast } = useToast();

const createProcess = async (payload: createProcessDto) => {
  return await POST(PROCESSES_API.CREATE, payload);
};

const updateProcess = async (payload: updateProcessDto) => {
  return await POST(PROCESSES_API.Update, payload);
};

const fetchprocess = async (filterOptions: filterOptionsDto) => {
  return (
    await GET<{ data: processDto }>(PROCESSES_API.GET, {
      ...filterOptions,
      productId: isString(filterOptions.productId)
        ? [filterOptions.productId]
        : [...filterOptions.productId],
    })
  ).data.data as processDto;
};

const fetchAllProcesses = async () => {
  return (await GET<{ data: processDto['processes'] }>(PROCESSES_API.CREATE))
    .data.data as processDto['processes'];
};

const fetchProcessById = async (id: string) => {
  return (await GET<{ data: processDataDto }>(`${PROCESSES_API.CREATE}/${id}`))
    .data.data as processDataDto;
};

const deleteProcesses = async (processes: string[]) => {
  return await DELETE(PROCESSES_API.CREATE, processes);
};

export const fetchProcessesList = (filterOptions = new filterOptionsDto()) => {
  return useQuery({
    queryKey: [
      'filterdprocesses',
      // `${filterOptions.handlerId}`,
      // `${filterOptions.handlerName}`,
      // `${filterOptions.startDate}`,
      // `${filterOptions.endDate}`,
      // `${filterOptions.productId}`,
      `${filterOptions.pageIndex}`,
    ],
    queryFn: async () => fetchprocess(filterOptions),
    retryDelay: 5000,
    refetchOnMount: true,
    enabled: false,
    placeholderData: keepPreviousData,
    // staleTime: Infinity, // Disable automatic refetching
  });
};

export const fetchfullProcessList = () => {
  return useQuery({
    queryKey: ['fullprocess'],
    queryFn: async () => fetchAllProcesses(),
    retryDelay: 5000,
    refetchOnMount: true,
    enabled: false,
  });
};

export const fetchProccessById = (id) => {
  return useQuery({
    queryKey: ['proccessById', id],
    queryFn: async () => fetchProcessById(id),
    retryDelay: 5000,
    enabled: false,
    refetchOnMount: false,
  });
};

export const MutateCreateProcess = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: createProcessDto) => createProcess(payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['filterdprocesses'],
      });
      QueryClient.invalidateQueries({
        queryKey: ['products'],
      });
      toast('Erfolgreich gespeichert', 'success');
    },
  });
};
export const MutateUpdateProcess = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: updateProcessDto) => updateProcess(payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['filterdprocesses'],
      });
      toast('Erfolgreich gespeichert', 'success');
    },
  });
};

export const MutateDeleteProcesses = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: (processes: string[]) => deleteProcesses(processes),
    onSuccess: (data) => {
      if (data) {
        QueryClient.invalidateQueries({ queryKey: ['filterdprocesses'] });
        toast('Elemente erfolgreich gelöscht', 'success');
      }
    },
  });
};
