import React, { useEffect } from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import useApp from "../hooks/useApp";
import { useRouter } from 'next/router'
const Header = () => {

  const router = useRouter()

  const { userAuthenticate, user, SingOut } = useAuth();
  const { clearStorage } = useApp()
  

  useEffect(() => {
    userAuthenticate();
  }, []);

const redirect = () => {
    router.push('/');
    clearStorage();
}

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img
          onClick={() => redirect()} 
          className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {user.name}</p>
            <button 
            type="button"
            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
            onClick={() => SingOut()}
            >Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/crearcuenta"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
            >
              Crear Cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
