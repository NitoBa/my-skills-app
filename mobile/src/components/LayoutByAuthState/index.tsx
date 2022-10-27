import { Box } from 'native-base'
import React, { useContext } from 'react'
import { AppRoutes } from '../../routes/app.routes'
import { AuthRoutes } from '../../routes/auth.routes'

import { AuthContext } from '../../contexts/AuthContext'
import { Loading } from '../Loading'

export function LayoutByAuthState() {
  const { isLoggedIn } = useContext(AuthContext)

  switch (isLoggedIn) {
    case 'idle':
      return (
        <Box flex="1" alignItems="center" justifyContent="center">
          <Loading size="lg" />
        </Box>
      )

    case 'logged':
      return <AppRoutes />

    case 'notLogged':
      return <AuthRoutes />
  }
}
