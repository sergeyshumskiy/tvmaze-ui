import { Routes, Route, Navigate } from 'react-router';

import Shows from './pages/shows'
import Layout from './layout'

function AppRoutes() {

  return (
    <Routes element>
      <Route element={<Layout />}>
        <Route path='/shows' element={<Shows />} />
        <Route path='*' element={<Navigate to='/shows' replace />} />
      </ Route>
    </Routes>
  )
}

export default AppRoutes
