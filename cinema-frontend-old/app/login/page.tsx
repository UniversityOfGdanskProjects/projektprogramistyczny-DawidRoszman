import React from 'react'
import LoginForm from './components/LoginForm'

const page = () => {
  return (
    <div className='grid h-screen w-100 place-items-center'>
    <div className='shadow-xl card bg-base-100'>
      <div className='card-body'>
        <h2 className='justify-center card-title'>Log in</h2>
        <div className='justify-center card-actions'>
          <LoginForm />
        </div>
      </div>
    </div>
    </div>
  )
}

export default page