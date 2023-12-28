import React from 'react'
import RegisterForm from './components/RegisterForm'

const page = () => {
  return (
    <div className='grid h-screen w-100 place-items-center'>
    <div className='shadow-xl card bg-base-100'>
      <div className='card-body'>
        <h2 className='justify-center card-title'>Log in</h2>
        <div className='justify-center card-actions'>
          <RegisterForm />
        </div>
      </div>
    </div>
    </div>
  )
}

export default page