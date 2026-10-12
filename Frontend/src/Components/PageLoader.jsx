import React from 'react'
import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className='flex align-center justify-center h-screen'>
      <LoaderIcon className="size-1o animate-spin"/>
    </div>
  )
}

export default PageLoader
