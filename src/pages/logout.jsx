import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Image from 'next/image'
import Link from 'next/link'
import nookies  from 'nookies'

import illustration from "../../public/images/illustration.svg"

const Logout = () => {

  const router = useRouter();

  useEffect(() => {
    const cookies = nookies.get(this)

    for (const cookie of Object.keys(cookies)) {
      nookies.destroy(this, cookie)
    }
   }, [router]);

  return (
    <div className="flex flex-col w-full max-w-xl text-center">
      <Image
        className="object-contain w-auto h-64 mb-8"
        src={illustration}
        alt="svg"
      />
      <div className="mb-8 text-center text-gray-900">
        You have succesfully signed out.
      </div>
      <div className="flex w-full">
        <Link href="/">
          <a className="btn btn-lg btn-rounded btn-block bg-blue-500 hover:bg-blue-600 text-white">
            Go back
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Logout
