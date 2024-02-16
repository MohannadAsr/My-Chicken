import React from 'react';

function ToastContainer() {
  return (
    <div
      id="toast-container"
      className=" flex justify-start items-center flex-col gap-4 z-[99999999] px-2 fixed left-1/2 -translate-x-1/2 bottom-[10px] w-full md:w-[50%] lg:w-[25%]"
    ></div>
  );
}

export default ToastContainer;
