import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../components/admin/Layout/Layout';
import { getError } from '../../../utils/error';
import s from '../../../styles/admin/Products.module.css'
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import { FiPlus } from "react-icons/fi";
import { ProductTypes } from '../../../types/ProductTypes';

function reducer(state:any, action:any) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
const AdminProducts:NextPage= () =>{
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully');
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId:string) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Product deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };


  return (
    <Layout title="Admin Products">
      {loading ?
        <LoadingSpinner /> :
        <div className={s.root}>
          <div className="flex justify-between">
            <div className={s.title}>
              Products
            </div>
            <button disabled={loadingCreate}
               className="inline-flex items-center px-4 py-1 h-10 bg-blue-500 border border-transparent rounded-md text-sm text-white hover:bg-blue-6000" onClick={createHandler}>
            <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add product
            </button>
          </div>
           {products.length > 0 &&  (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Rating
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Actions</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                {products.map((product:ProductTypes, index:number) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product._id}
                      </td>
                      <td className={s.cell}>
                          {product.name}
                      </td>
                      <td className={s.cell}>
                          ${product.price}
                      </td>
                      <td className={s.cell}>
                          {product.category}
                      </td>
                      <td className={s.cell}>
                          {product.rating}/5
                      </td>
                      <td className={`${s.cell} ${s.actionCell}`}>
                        <button 
                          className={`${s.actionBtn} ${s.viewBtn}`}
                          // onClick={() => viewEditUser(user._id, 'view')}
                          >
                          view
                        </button>
                        <Link href={`/admin/products/${product._id}`} className={`${s.actionBtn} ${s.editBtn}`} type="button">
                            Edit
                        </Link>
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className={`${s.actionBtn} ${s.deleteBtn}`}
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div>)}
        {/* {editModal && <UserEditModal data={userData} closeModalHandler={closeEditModalHandler} updateUserHandler={updateUserHandler} addNewUserHandler={addNewUserHandler} />} */}
        </div>}
    </Layout>
  );
}
export default AdminProducts