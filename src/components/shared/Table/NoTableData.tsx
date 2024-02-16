import React from 'react';

function NoTableData({ name }: { name: string }) {
  return (
    <div className=" my-10 flex justify-center items-center flex-col text-gray-400 font-bold gap-2 text-2xl md:text-3xl">
      No {name} Data
    </div>
  );
}

export default NoTableData;
