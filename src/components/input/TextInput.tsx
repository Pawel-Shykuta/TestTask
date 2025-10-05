import { ChangeEvent } from "react";
import {InputProps} from '../../types/Types'

function Input({
    checked, 
    readOnly, 
    label, 
    value, 
    onChange, 
    name,
    placeholder, 
    type,
    disabled ,
    className, 
    key 
  }: InputProps) {
  
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={className}>
      {label && <label className="block mb-1">{label}</label>}
      <input
        key={key}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        readOnly = {readOnly}
        checked={checked}
      />
    </div>
  );
}

export default Input;
