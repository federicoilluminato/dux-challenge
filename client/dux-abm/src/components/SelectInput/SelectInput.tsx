import { Dropdown } from 'primereact/dropdown'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface SelectInputProps {
  values: (string | number)[];
  placeholder: string;
  setSelected: Dispatch<SetStateAction<(string)>>;
  value? : (string | number | null);
}

const SelectInput: React.FC<SelectInputProps> = ({ values, placeholder, setSelected}) => {
   const [value, setValue] = useState<string | null>(null);
   const handleChange = (value: string) => {
    setSelected(value);
    setValue(value);
    console.log('value', value)
  };

  return (
    <Dropdown
      value={value}
      onChange={(e) => handleChange(e.value)} 
      options={values} optionLabel="name" 
      showClear 
      placeholder={placeholder} 
      className="w-12" />

  )
}

export default SelectInput