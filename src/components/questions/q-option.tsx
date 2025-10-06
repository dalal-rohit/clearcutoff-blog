import React from "react";

type OptionProps = {
  index?: number;
  optiontext?: string;
  imgurl?: string;
};

export default function QOption({ index, optiontext, imgurl }: OptionProps) {
  return (
    <>
      <div className="flex gap-2 items-center h-full">
        <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
          {index}
        </div>
        {optiontext && <div>{optiontext}</div>}
        {imgurl && <img src={imgurl} />}
      </div>
    </>
  );
}
