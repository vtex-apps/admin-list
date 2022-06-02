import React, { useContext } from 'react'

interface ContextUser {
  gridUsers: any
  view: any
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {},
  view: {},
})

export function useUser() {
  return useContext(ContextUser)
}
