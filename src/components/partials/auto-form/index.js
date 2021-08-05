import React, {useState}  from "react";
import Alert from '../../elements/alerts'
import Validation from '../../elements/forms/validation'

const AutoForms = ({items,onSubmit, message = null}) => {
  const [data, onSubmit] = useState(null)
  
  return (
    <>
      <div className="flex flex-col">
        {data && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default AutoForms