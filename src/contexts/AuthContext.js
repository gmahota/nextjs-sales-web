import React,{createContext,useState,useEffect} from 'react'
import {setCookie, parseCookies} from 'nookies'
import {signInRequest,recoverUserInformation} from '../services/auth'
import Router from 'next/router'
import { api } from '../services/api'


export const AuthContext = createContext({})

export function AuthProvider({children}){

  const [user,setUser] = useState(null)

  const isAuthenticated = !!user;

  useEffect(() => {
    const {'attendance.token': token} = parseCookies()

    if(token){
       recoverUserInformation().then(response=> {
         setUser(response.user)
       })
    }
  },[])

  async function signIn({username,password}){
    const user = await signInRequest({
      username,
      password
    })

    if(!!user?.token){
      setCookie(undefined,'attendance.token',user.token,{
        maxAge:60*60*14,// 1 hour
      })

      setCookie(undefined,'attendance.user',user.user,{
        maxAge:60*60*14,// 1 hour
      })

      api.defaults.headers['Authorization'] = `Bearer ${user.token}`;

      setUser(user.user)

      Router.push('/')
    }else{
      alert(user.msg)
    }

  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
