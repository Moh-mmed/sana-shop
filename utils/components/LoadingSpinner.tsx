import {ImSpinner6} from 'react-icons/im'
const LoadingSpinner: React.FC = () => {
  return (
    <div role="status" className="flex justify-center items-center py-10">
      <ImSpinner6 className='animate-spin text-3xl' />
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner