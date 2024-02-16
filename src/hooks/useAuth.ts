import { Domain } from '@src/enums/Domain';
import axios, { AxiosError } from 'axios';
import { useToast } from './useToast';

export class userDto {
  id = '' as string;
  name = '' as string;
  role = '' as string;
  token = '' as string;
}
const { toast } = useToast();
export const useAuth = () => {
  const Login = async (payload: { code: string }) => {
    try {
      const response = await axios.post(
        `${Domain.API_URL}/users/login`,
        payload
      );
      SetuserData(response.data.data as userDto);
      return response.data;
    } catch (error) {
      toast(error?.response?.data.message, 'error');

      throw error;
    }
  };

  const LogOut = () => {
    localStorage.removeItem(Domain.localStorageName);
    window.location.assign('/signin');
  };

  const SetuserData = (userData: userDto) => {
    localStorage.setItem(Domain.localStorageName, JSON.stringify(userData));
  };

  const GetUserData = (): userDto | undefined => {
    const userData = localStorage.getItem(Domain.localStorageName);
    return userData ? JSON.parse(userData) : JSON.stringify(undefined);
  };

  const isAuth = (SuccessFn: () => void, FailFn?: () => void) => {
    isLoggedIn() ? SuccessFn() : FailFn ? FailFn() : null;
  };

  const GetAccessToken = (): string | undefined => {
    const userData = GetUserData();
    return userData ? userData.token : null;
  };

  const isLoggedIn = (): boolean => {
    const userData = localStorage.getItem(Domain.localStorageName);
    return userData ? true : false;
  };

  return {
    Login,
    LogOut,
    GetUserData,
    isLoggedIn,
    GetAccessToken,
    SetuserData,
    isAuth,
  };
};
