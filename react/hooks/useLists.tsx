import React, { useContext } from 'react'

interface ContextLists {
  grid: any 
  view: any
}

export const ContextLists = React.createContext<ContextLists>({
  grid: {},
  view: {}
})

export function useLists() {
  return useContext(ContextLists)
}
