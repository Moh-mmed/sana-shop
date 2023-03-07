import axios from 'axios';
import { NextPage } from 'next';
import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../components/admin/Layout/Layout';
import { getError } from '../../../utils/error';
import s from '../../../styles/admin/Products.module.css'
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import { FiPlus } from "react-icons/fi";
import { ProductTypes } from '../../../types/ProductTypes';
import ProductEditModal from '../../../components/admin/ProductEditModal/ProductEditModal';
import ProductViewModal from '../../../components/admin/ProductViewModal/ProductViewModal';

const AdminProducts:NextPage= () =>{
  const [editModal, setEditModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [productData, setProductData] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => { fetchData() }, []);
  
  const closeModalHandler = (modal:string, reload:boolean=false) => {
    modal === 'view' ? setViewModal(false) : setEditModal(false)
    reload && fetchData()
    setProductData(null)
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/admin/products`);
      setProducts(data.data)
      setLoading(false)
    } catch (err) {
      toast(getError(err) )
    }
  };

  const deleteHandler = async (productId:any) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      setLoading(true)
      const {data} = await axios.delete(`/api/admin/products/${productId}`);
      setLoading(false)
      toast.success(data.message);
      fetchData()
    } catch (err) {
      setLoading(false)
      toast.error(getError(err));
    }
  };

  const addProduct = () => setEditModal(true)

  const fetchDataAndOpenModal = async (productId:any, action:string)=> {
      try {
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        setProductData(data.data)
        if (action === 'edit') {
          setEditModal(true)
        } else {
          setViewModal(true)
        }
      } catch (err) {
        toast(getError(err))
      }
  }
  
  return (
    <Layout title="Admin Products">
      <div className="flex justify-between">
        <div className={s.title}>
          Products
        </div>
        <button
            className="inline-flex items-center px-4 py-1 h-10 bg-blue-500 border border-transparent rounded-md text-sm text-white hover:bg-blue-6000" onClick={addProduct}>
        <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add product
        </button>
      </div>

      {loading ?
        <LoadingSpinner />
        :
        <div className={s.root}>
           {products.length > 0 ? (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                          ${product.price.toFixed(2)}
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
                          onClick={() => fetchDataAndOpenModal(product._id, 'view')}
                          >
                          view
                        </button>
                        <button 
                          className={`${s.actionBtn} ${s.editBtn}`}
                          onClick={() => fetchDataAndOpenModal(product._id, 'edit')}
                          >
                          edit
                        </button>
                        <button
                          onClick={() => deleteHandler(product?._id)}
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
          </div>)
            : 
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-center text-gray-500 text-lg">No product found!</p>
          </div>
        }
        {editModal && <ProductEditModal data={productData} closeModalHandler={closeModalHandler}/>}
        {viewModal && <ProductViewModal data={productData} closeModalHandler={closeModalHandler}/>}
        </div>}
    </Layout>
  );
}
export default AdminProducts