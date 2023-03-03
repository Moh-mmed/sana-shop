import s from './UserEditModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { UserTypes } from '../../../types/DataTypes'
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
type PropsTypes = {
    data: UserTypes | null,
    closeModalHandler: ()=>void,
    updateUserHandler: (userId: any,user:UserTypes)=>void,
    addNewUserHandler: (user:UserTypes)=>void,
}

const UserEditModal: React.FC<PropsTypes> = ({ data, closeModalHandler, updateUserHandler,addNewUserHandler }) => {
    const [user, setUser] = useState({name:'',email:'', password:'', isAdmin:false})

    useEffect(() => {
        if (data) {
          setUser(prevState=>({...prevState, name:data.name,email:data.email, isAdmin:data.isAdmin}))
      }
    
    }, [data])
    
    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        if (user.name.length, user.email.length) {
            if (data) {
                updateUserHandler(data._id, user)
            } else {
                 user.password.length && addNewUserHandler(user)
            }
        }
    }

    const fieldChangeHandler = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        let value = e.target.value
        let name = e.target.name
        setUser((prevState)=>({...prevState, [name]: name==='isAdmin'? value==='admin' && true : value}))
    }

    return (<div className={s.editModal_container}>
        <div className={s.editModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={closeModalHandler}>
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
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" onChange={fieldChangeHandler}/>
                    </div>
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a role</label>
                        <select id="countries" name="isAdmin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={fieldChangeHandler} defaultValue={user?.isAdmin?"admin":"user"}>
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