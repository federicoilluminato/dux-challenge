import { Dropdown } from 'primereact/dropdown'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface SelectInputProps {
  values: (string | number)[];
  placeholder: string;
  setSelected: Dispatch<SetStateAction<(string)>>;
  value? : (string | number | null);
}

const SelectInput: React.FC<SelectInputProps> = ({ values, placeholder, setSelected, value}) => {

   const handleChange = (selected: string) => {
    setSelected(selected);
  };

  return (
    <Dropdown
      value={value?.toString()}
      onChange={(e) => handleChange(e.value)} 
      options={values} optionLabel="name" 
      showClear 
      placeholder={placeholder} 
      className="w-12" />

  )
}

export default SelectInput