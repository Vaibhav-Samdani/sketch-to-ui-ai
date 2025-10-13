'use client'

import React, { use } from 'react'

const Page = ({params,}:{
    params : Promise<{session : string}>
}) => {
    const {session} = use(params);

  return (
    <div>{session}</div>
  )
}

export default Page