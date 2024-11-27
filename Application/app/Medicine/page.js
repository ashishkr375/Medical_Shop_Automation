import React from 'react'

function MedicinePage() {
  return (
    <div className='justify-center text-center my-auto py-auto'>
        <div className='grid grid-cols-2 justify-center text-center gap-20 h-10 text-white'>
            <div className='bg-gray-700'>
                <a href='/Medicine/Check'>Check Stock</a>
            </div>
            <div className='bg-gray-700'>
                <a href='/Medicine/Update'>Update Stock</a>
            </div>
        </div>
    </div>
  )
}

export default MedicinePage