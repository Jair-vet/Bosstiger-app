import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const SearchBox = () => {

    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
  
    // FIX: uncontrolled input - urlKeyword may be undefined
    const [keyword, setKeyword] = useState(urlKeyword || '');
  
    const submitHandler = (e) => {
      e.preventDefault();
      if (keyword) {
        navigate(`/search/${keyword.trim()}`);
        setKeyword('');
      } else {
        navigate('/');
      }
    };

    return (
        <form onSubmit={submitHandler} className='d-flex'>
            <input
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Products...'
                className=' rounded-md ml-4 p-2 text-buttonColor'
            ></input>
            <button type='submit' className='p-2 mx-2'>
                Search
            </button>
        </form>
    )
}
