export const useToast = () => {
  const toastColors = {
    error: ['bg-red-500/95', 'hover:bg-red-500', 'shadow-md'],
    success: ['bg-success/95', 'hover:bg-success', 'shadow-md'],
    warning: ['bg-warning/95', 'hover:bg-warning', 'shadow-md'],
  };

  const toast = (
    text: string,
    type: 'success' | 'error' | 'warning',
    time?: number
  ) => {
    const toastcontainer = document.getElementById('toast-container');

    if (!toastcontainer) {
      console.error('Toast container not found');
      return;
    }

    // Remove existing toasts Remove it if you want to keep only one of it show up
    const existingToasts = toastcontainer.getElementsByClassName('toast');
    for (const existingToast of existingToasts) {
      toastcontainer.removeChild(existingToast);
    }

    const toast = document.createElement('div');
    const toastId = Math.random();
    toast.id = `${toastId}`;
    toast.classList.add('toast');
    toastColors[type].forEach((item) => {
      toast.classList.add(item);
    });
    toast.textContent = text;

    let timeoutId: NodeJS.Timeout;

    const removeToast = () => {
      if (toastcontainer.contains(toast)) {
        toastcontainer.removeChild(toast);
      }
    };

    toast.onclick = removeToast;
    toast.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId); // Clear the timeout when hovering
    });

    toast.addEventListener('mouseleave', () => {
      // Set a new timeout when the user stops hovering
      timeoutId = setTimeout(removeToast, time || 2500);
    });

    toastcontainer.appendChild(toast);

    // Set the initial timeout to remove the toast
    timeoutId = setTimeout(removeToast, time || 2500);
  };

  return { toast };
};
