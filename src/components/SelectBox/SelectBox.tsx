import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useMatch } from "react-router-dom";
import { AreaCodeType } from "../../lib/area";

type SelectBoxProps = {
  isLoading?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: AreaCodeType[];
};

const SelectBox = ({ isLoading, value, setValue, options }: SelectBoxProps) => {
  const campingMatch = useMatch("camping");

  const changeSelectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (setValue) {
        setValue(e.target.value);
      }
    },
    [],
  );

  return (
    <select
      className="py-2 w-40 rounded-md font-semibold text-slate-500 border-blue-400 outline-none"
      value={value}
      onChange={changeSelectHandler}
    >
      {!isLoading &&
        options &&
        options.map((option) => (
          <option
            key={option.code}
            value={!campingMatch ? option.code : option.name}
          >
            {option.name}
          </option>
        ))}
    </select>
  );
};

export default React.memo(SelectBox);
