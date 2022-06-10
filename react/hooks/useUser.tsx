import type { UsePaginationReturn } from '@vtex/admin-ui'
import React, { useContext } from 'react'

interface ContextUser {
  gridUsers: any
  view: any
  search: string
  getInputProps: any
  debouncedValue: string
  pagination: UsePaginationReturn
}

export const ContextUser = React.createContext<ContextUser>({
  gridUsers: {},
  view: {},
  search: '',
  getInputProps: () => {},
  debouncedValue: '',
  pagination: {} as UsePaginationReturn,
})

export function useUser() {
  return useContext(ContextUser)
}
