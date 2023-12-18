import React, { useState } from 'react';

const PageLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your logic here to handle form submission
    console.log('Form submitted with:', formData);
  };

  return (
    <form 
    className='
    flex flex-col gap-3 items-center justify-center
    bg-slate-50 p-4
    '
    onSubmit={handleSubmit}>

      <h2>Login form</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className='bg-white p-2 rounded-md'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className='bg-white p-2 rounded-md'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default PageLogin;
