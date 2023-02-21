import Link from "next/link";
import { useEffect } from "react";
import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";
import Dropzone from "../components/Dropzone";
import useApp from "../hooks/useApp";
import Alert from "../components/Alert";

export default function Home() {


  // Extraer el usuario autenticado del storage
  const { userAuthenticate } = useAuth();
  const { msg_file, url } = useApp()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      userAuthenticate()
    }
  }, [])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
          <p className="text-center text-3xl mt-10">
            <span className="font-bold text-red-700 text-4xl uppercase">Tu URL es </span>{`${process.env.frontendURL}/links/${url}`}</p>
            <button
                type="button"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                onClick={ () => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
              >
                Copiar Enlace
              </button>
          </>
        ) : (
          <>
            {msg_file && <Alert />}

            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mt-16 mx-2 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir Archivos de forma sencilla y privada</h2>
                <p className="text-lg leading-loose text-justify">ReactNodeSend <span>te permite enviar archivos de forma segura. Cuando subes un archivo, Firefox Send genera un enlace que puedes compartir con el recipiente. Para más seguridad, también tienes la opción de establecer una contraseña y cambiar la configuración de la fecha de validez. Los archivos no se guardan en la nube.</span></p>
                <Link
                  href='/crearcuenta'
                  className="text-red-500 font-bold text-lg hover:text-red-700"

                >
                  Crea una cuenta para mayores beneficios.
                </Link>
              </div>


            </div>
          </>
        )}

      </div>
    </Layout>
  )
}
