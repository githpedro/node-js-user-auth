// src/app/page.tsx
import React from 'react';
import "../../styles/estilos.sass"

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    geo: {
      lat: string;
    };
  };
  company: {
    name: string
  }
}

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const HomePage = async () => {
  const users: User[] = await getData();

  return (
    <div className='xd4'>
      <h1 className='xd5'>Usuarios desde la API</h1>
      <ul className='xd6'>
        {users.map(user => (
          <li className='xd7' key={user.id}>
            <p className='xd8'><strong>Nombre:</strong> {user.name}</p>
            <p className='xd9' ><strong>Ciudad:</strong> {user.address.city}</p>
            <p className='xd10'><strong>Geolocalización (Latitud):</strong> {user.address.geo.lat}</p>
            <p className='xd11'><strong>Nombre de la Compañia</strong>{user.company.name}</p>
          </li>
        ))}
      </ul>
      <a href='../../'>Back</a>
    </div>
  );
};

export default HomePage;
