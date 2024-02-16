import { switchDeleteAlert } from '@src/reducers/AppSlice';
import store from '@src/store/store';

const useDeleteAlert = (successFn: () => Promise<any>) => {
  const checkConfirm = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      store.dispatch(switchDeleteAlert(true));
      setTimeout(() => {
        const confirmButton = document.getElementById('deleteConfirm');
        const declineButton = document.getElementById('deleteDecline');

        const closeDialog = () => {
          store.dispatch(switchDeleteAlert(false));
          confirmButton.removeEventListener('click', onConfirm);
          declineButton.removeEventListener('click', onDecline);
        };

        const onConfirm = async () => {
          try {
            const result = await successFn();
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
            closeDialog();
          }
        };

        const onDecline = () => {
          reject(new Error('declined'));
          closeDialog();
        };
        if (confirmButton && declineButton) {
          confirmButton.addEventListener('click', onConfirm);
          declineButton.addEventListener('click', onDecline);
        }
      }, 150);
    });
  };

  return { checkConfirm };
};

export default useDeleteAlert;
