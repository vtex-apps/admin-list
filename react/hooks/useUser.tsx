import React, { useContext } from 'react'

interface ContextUser {
  gridUsers: any
  view: any
  search: string
  getInputProps: any
  debouncedValue: string
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {},
  view: {},
  search: '',
  getInputProps: () => {},
  debouncedValue: '',
})

export function useUser() {
  return useContext(ContextUser)
}
