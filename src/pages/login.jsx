import React,{useState} from "react";
import Link from "next/link";
import Image from 'next/image'
import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import Layout from "../layouts/centered";
import CenteredForm from "../layouts/centered-form";

import Logo from "../../public/icons/favicon.ico";

const Index = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(data) {
    await signIn({username,password});
  }

  return (
    <Layout>
      <CenteredForm>
        <div className="max-w-sm w-full space-y-8">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
              src={Logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-green-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="user" className="sr-only">
                  User Name
                </label>
                <input
                  {...register("userName")}
                  id="userName"
                  name="userName"
                  type="text"
                  value={username}
                  onChange={event => setUserName(event.target.value)}
                  autoComplete="userName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="User Name"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link className="font-medium text-indigo-600 hover:text-indigo-500"  href="/">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </CenteredForm>
    </Layout>
  );
};

export default Index;
