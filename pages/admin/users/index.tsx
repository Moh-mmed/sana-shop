import axios from 'axios';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import {  useEffect,  useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../../components/admin/Layout/Layout';
import s from '../../../styles/admin/Users.module.css'
import { getError } from '../../../utils/error';
import UserEditModal from '../../../components/admin/UserEditModal/UserEditModal';
import { FiPlus } from "react-icons/fi";
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import UserViewModal from '../../../components/admin/UserViewModal/UserViewModal';
import { UserTypes } from '../../../types/UserTypes';

const AdminUsers: NextPage = ({admin}:any) => {
  const [users, setUsers] = useState<UserTypes[]>([])
  const [editModal, setEditModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/api/admin/users`);
      setUsers(data.data.filter((user: UserTypes) => user._id !== admin._id))
      setLoading(false)

    } catch (err) {
      console.log(getError(err))
      setLoading(false)
    }
  };
  
  const closeModalHandler = (modal:string) => {
    modal==='view'?setViewModal(false):setEditModal(false)
    setUserData(null)
    fetchData()
  }

  const deleteUserHandler = async (userId:any) => {
    if (!window.confirm('Are you sure you want to delete this User?')) {
      return;
    }
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      toast.success('User deleted successfully');
      fetchData();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const viewEditUser = async (userId:any, action:string)=> {
    try {
      const { data } = await axios.get(`/api/admin/users/${userId}`);
      setUserData(data.data)
      if (action === 'edit') {
        setEditModal(true)
      } else {
        setViewModal(true)
      }
    } catch (err) {
      toast(getError(err))
    }
  }

  const addUser = () => setEditModal(true)

  useEffect(() => {fetchData()}, []);
  
  return (
    <Layout title="Users">
      {!loading ? <div className={s.root}>
        <div className="flex justify-between">
          <div className={s.title}>
            Users
          </div>
          <button className="inline-flex items-center px-4 py-1 h-10 bg-blue-500 border border-transparent rounded-md text-sm text-white hover:bg-blue-6000" onClick={addUser}>
          <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add User
        </button>
        </div>
        {users.length > 0 &&  (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Actions</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user._id}
                      </th>
                      <td className={s.cell}>
                          {user.name}
                      </td>
                      <td className={s.cell}>
                          {user.email}
                      </td>
                      <td className={s.cell}>
                          <span className={`${user.isAdmin?s.admin:s.user}`}>{user.isAdmin?'admin':'user'}</span>
                      </td>
                      <td className={`${s.cell} ${s.actionCell}`}>
                        <button 
                          className={`${s.actionBtn} ${s.editBtn}`}
                          onClick={() => viewEditUser(user._id, 'edit')}>
                          edit
                        </button>
                        <button 
                          className={`${s.actionBtn} ${s.viewBtn}`}
                          onClick={() => viewEditUser(user._id, 'view')}>
                          view
                        </button>
                        <button 
                          className={`${s.actionBtn} ${s.deleteBtn}`}
                          onClick={() => deleteUserHandler(user._id)}>
                          delete
                        </button>
                      </td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div>)}
        {editModal && <UserEditModal data={userData} closeModalHandler={()=>closeModalHandler('edit')}/>}
        {viewModal && <UserViewModal data={userData} closeModalHandler={()=>closeModalHandler('view')}/>}
      </div> :
        <LoadingSpinner/>}
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const session = await getSession(context) as Session & { user: UserTypes };

  if (!session || !session.user.isAdmin) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      admin: session.user
    },
  };
}

export default AdminUsers;
