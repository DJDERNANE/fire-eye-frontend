import React, { useEffect, useState } from 'react';
import Template from '../comps/Template';
import Filter from '../comps/Filter';
import { MainApi } from '../utils/data/constant';

const Fires = () => {
  const [fires, setFires] = useState([]); // Initialize to an empty array
  const getData = async () => {
    try {
      const response = await fetch(`${MainApi}fire`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      if (result && result.data) {
        setFires(result.data);
      } else {
        // Handle the case where data is not in the expected format or empty
        console.error('No data returned');
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Template>
      <h1 className="font-main text-5xl text-black pt-4 text-center">
        Welcome back, Walid Younes
      </h1>
      <p className='fs-1 my-3 fw-bold pl-8'>Fires</p>
     
      <div className='p-0 bg-white rounded-4 table-container'>
        <table className="table table-hover custom-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Area</th>
              <th scope="col">Raison</th>
            </tr>
          </thead>
          <tbody>
            {fires && fires.map((fire) => (
              <tr key={fire.id}>
                <th scope="row">{fire.CreatedAt}</th>
                <td>{fire.area} h</td>
                <td className='text-success fw-bold'>{fire.raison }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
}

export default Fires;