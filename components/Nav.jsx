"use client"
import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  //const isUserLoggedIn = false;
  const {data:session}=useSession();

  const [providers, setProviders] = useState(null)
  const [toggle,setToggle]=useState(false)

  useEffect(() => {
    const func = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    func()
  }, [])


  

  return (
    <nav className="flex-between w-full  pt-3">
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt="Prompedia_Logo" width={40} height={40} className='object-contain filter-green' />
        <p className='logo_text'>Prompedia</p>
      </Link>

    {/* Desktop Navigation */}
    <div className="sm:flex hidden">
      {/*If user is logged in he will be displayed with create-post and signout button, otherwise he would be displayed sign in button*/}
      {session?.user ? (
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>Create Prompt</Link>

          <button type="button" onClick={signOut} className='outline_btn'> Sign Out</button>

          <Link href='/profile'>
            <Image src={session?.user.image} alt="Profile_Logo" width={40} height={40} className="rounded-full" />
          </Link>
        </div>
      ) : (
        <>
          {providers && Object.values(providers).map((el) => (
            <button type="button" key={el.name} className='black_btn' onClick={() => signIn(el.id)}>
              Sign In
            </button>
          ))}
        </>
      )}

    </div>

  {/* Mobile navigation */}
    <div className='sm:hidden flex relative'>
    {session?.user ? (
      <div className='flex'>
        <Image src={session?.user.image} alt="Profile_Logo" width={40} height={40} className="rounded-full"onClick={()=>setToggle((prev)=>!prev)} /> 

        {toggle && (
          <div className='dropdown '>
            <Link href='/profile' className="dropdown_link" onClick={()=>setToggle(false)}>My Profile</Link>
            <Link href='/create-prompt' className="dropdown_link" onClick={()=>setToggle(false)}>Create Prompt</Link>

            <button type="button" className='mt-5 w-full black_btn'
              onClick={()=>{
                setToggle(false)
                signOut()
                }}>

              Sign Out
            </button>

          </div>
        )}
        
      </div>
    ) :(
      <>
          {providers && Object.values(providers).map((el) => (
            <button type="button" key={el.name} className='black_btn' onClick={() => signIn(el.id)}>
              Sign In
            </button>
          ))}
        </>
    )}

    </div>






    </nav>
  )
}

export default Nav