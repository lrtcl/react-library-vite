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
      <TextInput label="Internally controlled input" showCounter maxLength={64} counterText="caractères" />

      <TextInput label="Internally controlled input with default value" defaultValue="test" showCounter maxLength={64} counterText="caractères" />

      <TextInput label="Controlled input" value={value} onChange={handleChange} showCounter maxLength={64} counterText="caractères" />
      <p>The value of the controlled input is: {value}</p>
    </div>
  )
}

export default App
