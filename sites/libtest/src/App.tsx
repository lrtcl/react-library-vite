import { useState } from 'react';
import { TextInput } from 'react-library-vite';
import '../../../node_modules/react-library-vite/dist/index.css';
import './App.css';

function App() {

  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <TextInput label="With counter" showCounter counterLimit={10} counterHelperText="Vous pouvez saisir jusqu’à 10 caractères" counterTextUnderLimit="caractères restants" counterTextOverLimit="caractères en trop" />

      <TextInput label="Without counter" />
    </div>
  )
}

export default App
