import s from './UserEditModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { UserTypes } from '../../../types/UserTypes'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getError } from '../../../utils/error'
import axios from 'axios'

type PropsTypes = {
    data: UserTypes | null,
    closeModalHandler: (modal: string, reload?: boolean)=>void,
}

const UserEditModal: React.FC<PropsTypes> = ({ data, closeModalHandler}) => {
    const [user, setUser] = useState({name:'',email:'', password:'', isAdmin:false})
    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        if (data) {
          setUser(prevState=>({...prevState, name:data.name,email:data.email, isAdmin:data.isAdmin}))
      }
    
    }, [data])
    
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (user.name.length, user.email.length) {
            if (data) {
                updateUserHandler(user)
            } else {
                user.password.length && addNewUserHandler(user)
            }
        }
    }

    const fieldChangeHandler = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        let value = e.target.value
        let name = e.target.name
        if (name === 'isAdmin') {
            setUser((prevState)=>({...prevState, isAdmin: value ==='admin' ? true:false}))
            return 
        }
        setUser((prevState)=>({...prevState, [name]: value}))
    }

    const updateUserHandler = async (formData:any) => {
        try {
        const res = await axios.put(`/api/admin/users/${data?._id}`, formData);
        toast.success(res.data.message);
        closeModalHandler('edit', true)
        } catch (err) {
        toast.error(getError(err));
        }
    };

    const addNewUserHandler = async (formData:any) => {
        try {
        const res = await axios.post(`/api/admin/users`, formData);
        toast.success(res.data.message);
         closeModalHandler('edit', true)
        } catch (err) {
        toast.error(getError(err));
        }
    };


    return (<div className={s.editModal_container}>
        <div className={s.editModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={()=>closeModalHandler('edit')}>
                <IoIosCloseCircleOutline/>
                <span className="sr-only">Close modal</span>
            </button>
                
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 capitalize">{data?"update user":"add new user"}</h3>
                <form className="space-y-6" onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" name="name" value={user?.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="John" required onChange={fieldChangeHandler}/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" name="email" value={user?.email}  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="name@company.com" required onChange={fieldChangeHandler}/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" onChange={fieldChangeHandler} />
                    </div>
                    <div>
                        <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900">Select a role</label>
                        <select id="roles" name="isAdmin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={fieldChangeHandler}>
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{data?"Update":"Add"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UserEditModal