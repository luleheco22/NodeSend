import Layout from "../components/Layout";
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

export default function CrearCuenta() {

    const { createUser, messague } =useAuth()
 
  // Formulario con Validacion con formik y yup

  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        password: '',
    },
    validationSchema: Yup.object({
       name: Yup.string()
         .matches(/^\S*$/, 'No puede contener espacios')
         .matches(/^[a-zA-Z]+$/, 'Solo puede contener letras')
         .required('El nombre es obligatorio'),
    
       email: Yup.string()
         .email('El email no es válido')
         .required('El email es obligatorio'),

       password: Yup.string()
         .min(6,'El password debe contener al menos 6 caracteres')
         .required('El password es obligatorio')


    }),
    onSubmit: (values) => {
        console.log('ENTRO')
        createUser(values)
    }
  });



  return (
   <Layout>
         <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center">Crear Cuenta</h2>

            { messague && <Alert/>}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Nombre</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inherit" 
                               type="text" 
                               id="name" 
                               placeholder="Nombre de Usuario"
                               value={formik.values.name}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                              {formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                              ): null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inherit" 
                               type="email" 
                               id="email" 
                               placeholder="Email de Usuario"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                               {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                              ): null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-inherit" 
                               type="password" 
                               id="password" 
                               placeholder="Password de Usuario"
                               value={formik.values.password}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               />
                               {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                              ): null}
                        </div>

                        <input 
                          type="submit" 
                          className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold hover:cursor-pointer"
                          value="Crear Cuenta"
                          />
                        
                    </form>
                </div>
            </div>
         </div>
   </Layout>
  )
}
