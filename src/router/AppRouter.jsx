import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../globalhooks/useCheckAuth"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components"

export const AppRouter = ( ) => {

  // console.log('ROUTER')

  const {status} = useCheckAuth();

  if(status === 'checking'){
    return <CheckingAuth />
  }

  // console.log('>> ', status)
  

  return (
    // Otra manera de proteger rutas
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path="/*" element={<JournalRoutes />} /> // Si estoy autenticado (las rutas del Journal routes SI existiran y las del "auth" NO)
        : <Route path="/auth/*" element={<AuthRoutes />} /> // Si no estoy autenticado (las rutas Auth si existiran y las del "JournalRoutes" NO)
      }

      <Route path="/*" element={<Navigate to='/auth/login' />} /> {/* Si NO estoy autenticado e ingreso a cualquiera otra ruta, que me redirija al login... NOTA: Aqui se se llamara en caso de que NO este autenticad, ya que en caso de que SI lo estuviera pues me llamara la que esta arriba en el "JournalRoutes"  entonces siempe se ira por esa primero ya que es la que esta escrita de primero*/}


        {/* // <Route path="/auth/*" element={<AuthRoutes />} />

        // <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  )
}
