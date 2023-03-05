import s from './UserViewModal.module.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import { UserTypes } from '../../../types/UserTypes'
import { useEffect } from 'react'
type PropsTypes = {
    data: UserTypes|null,
    closeModalHandler: (modal: string, reload?: boolean)=>void,
}

const UserViewModal: React.FC<PropsTypes> = ({ data, closeModalHandler }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'auto';
        };
    }, []);
    return (<div className={s.viewModal_container}>
        <div className={s.viewModal}>
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center" onClick={()=>closeModalHandler('view')}>
                <IoIosCloseCircleOutline/>
                <span className="sr-only">Close modal</span>
            </button>
                
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 capitalize">User detail</h3>
                <div className='mt-5'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input disabled type="text" name="name" value={data?.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="John" required />
                </div>
                <div className='mt-5'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input disabled type="email" name="email" value={data?.email}  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-4 w-full" placeholder="name@company.com" required />
                </div>
                <div>
                    <span className={`${data?.isAdmin?s.admin:s.user}`}>{ data?.isAdmin?'admin':"user"}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserViewModal