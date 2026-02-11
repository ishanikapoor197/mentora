import React, { Suspense } from 'react'
import {PropagateLoader} from"react-spinners";
const Layout = ({children}) => {
  return (
    <div className='px-5'>
        <Suspense fallback={<PropagateLoader className="mt-4" width={"100%"} color='gray' />}>

      {children}
        </Suspense>
    </div>
  )
}

export default Layout
