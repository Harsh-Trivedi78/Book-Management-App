import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
     .get('http://localhost:5555/books')
     .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
     .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className='p-4 h-screen'
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557682260-96773eb01377?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex justify-center items-center'></div>
      <h1 className='text-3xl my-8'>Books List</h1>
      <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
      </Link>

      {loading? (
        <Spinner />
      ) : (
        <table className='w-full border -separate  border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Author
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Publish Year
              </th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {book.title}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.author}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {book.publishYear}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className='text-2x1 text-emerald-900' />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className='text-2x1 text-teal-800' />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className='text-2x1 text-red-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;