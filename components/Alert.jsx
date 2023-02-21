import React from 'react'
import useApp from '../hooks/useApp'
import useAuth from '../hooks/useAuth'

const Alert = () => {

    const { messague } = useAuth()
    const { msg_file } = useApp();
    console.log(messague)
  return (
    <div  className={`py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto ${!!messague?.create || msg_file  ? 'bg-red-500' : 'bg-green-500'}`}>
      { messague?.msg || msg_file }
    </div>
  )
}

export default Alert
