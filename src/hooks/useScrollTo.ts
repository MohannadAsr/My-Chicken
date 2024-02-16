const useScrollTo = (id: string) => {
  const targetEl = document.getElementById(id);
  if (targetEl) {
    targetEl.scrollIntoView();
  }
};

export default useScrollTo;
