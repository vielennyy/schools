import { TextField, Chip, Box, SxProps } from "@mui/material";
import { useState } from "react";

interface MultipleValuesInputProps{
    values: string[];
    setValues:  React.Dispatch<React.SetStateAction<string[]>>
    sxStyles?: SxProps;
}


export const MultipleValuesInput = ({values, setValues, sxStyles}: MultipleValuesInputProps) => {
  const [inputValue, setInputValue] = useState('');
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      setValues([...values, inputValue]);
      setInputValue('');
    }
  };

  const handleChipDelete = (chipToDelete: string) => () => {
    setValues((chips: string[]) => chips.filter((chip: string) => chip !== chipToDelete));
  };

  return (
    <Box sx={sxStyles}>
      <TextField
        label="Електрона адреса"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Box  sx={{paddingTop: 1}}>
        {values.map((value, index) => (
          <Chip
          sx={{marginBottom: 1, marginRight:1}}
            key={index}
            label={value}
            onDelete={handleChipDelete(value)}
            color="primary"
          />
        ))}
      </Box>
    </Box>
  );
};

export default MultipleValuesInput;
