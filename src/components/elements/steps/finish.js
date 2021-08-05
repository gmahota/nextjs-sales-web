import Alert from '../alerts'
import {FiAlertCircle} from 'react-icons/fi'

const Finish = ({index, dispatch, setOpenTab, isLast}) => {
  return (
    <div className="flex flex-col">
          <Alert
            size="sm"
            color="bg-transparent text-gray-900"
            icon={<FiAlertCircle className="alert-icon" />}>
            Thanks for your purchase. Your package will get delivered tomorrow.
          </Alert>
    </div>
  )
}

export default Finish
