import { useState } from "react";

export const useField = (name) => {
  const [value,setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const reset = (e)=>{
    setValue('')
  }
  return [{ value, onChange, name },{reset}];

};
