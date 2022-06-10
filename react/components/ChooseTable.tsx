import { FC } from 'react'
import React from 'react'
import TableArea from './Table'
import TableUserArea from './TableUser'
import { useInterface } from '../hooks/useInterface'

const ChooseTableArea: FC = () => {
  const { tableLists } = useInterface()  

  if(tableLists) return <TableArea/>

  return <TableUserArea />
}

export default ChooseTableArea
