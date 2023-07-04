import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted:', { name, mobileNumber, password });
    // Reset form fields
    setName('');
    setMobileNumber('');
    setPassword('');
  };

  return (
    <div className="container">
      <h1>Register Customer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={75}
          />
        </label>
        <label>
          Customer Mobile Number:
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </label>
        <label>
          Customer initial password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={30}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
