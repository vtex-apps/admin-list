import React, { useContext } from 'react'

interface ContextStoreType {
  valuesLists: any
}

export const ContextLists = React.createContext<ContextStoreType>({
  valuesLists: ''
})

export function useStore() {
  return useContext(ContextLists)
}
