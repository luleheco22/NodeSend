import { useState } from "react";
import Alert from "../../components/Alert";
import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import useApp from "../../hooks/useApp";

export async function getServerSideProps({ params }) {
  const { link } = params

  const result = await axiosClient.get(`/links/${link}`)
  return {
    props: {
      link: result.data
    }
  }
}

export async function getServerSidePaths() {
  const links = await axiosClient.get('/links')

  return {
    paths: links.data.links.map(link => ({
      params: {
        link: link.url
      }
    })),
    fallback: false,
  }
}


export default ({ link }) => {
  const [havePassword, setHavePassword] = useState(link.password);
  const [password, setPassword] = useState('');
  const { showAlert, msg_file } = useApp();
  const verifyPassword = async e => {
    e.preventDefault();

    const data = {
      password,
    }
    try {
      const result = await axiosClient.post(`/links/${link.link}`, data);
      if (result.data.password) {
        setHavePassword(false);
      } 
      if (result.data.msg) {
        showAlert(result.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
    
  }
 
 
  return (
    <Layout>
      {havePassword ? (
        <>
          <p className="text-center">Este enlace está protegido por un Password</p>
          {msg_file && <Alert/> }
          <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => verifyPassword(e)}
            >
              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inherit"
                  type="password"
                  id="password"
                  placeholder="Password del Enlace"
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
                />
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer"
                  value="Validar Password"
                />
              </div>

            </form>
          </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">Descarga tu Archivo:</h1>
          <div className="flex items-center justify-center mt-10">
            <a href={`${process.env.backendURL}/files/${link.file}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
              download
            >Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  )
}




