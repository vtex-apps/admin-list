import type { FC } from 'react'
import React from 'react'

import TableUserArea from './TableUser'
import { useInterface } from '../hooks/useInterface'
import TableListArea from './TableList'

const ChooseTableArea: FC = () => {
  const { tableLists } = useInterface()

  if (tableLists) return <TableListArea />

  return <TableUserArea />
}

export default ChooseTableArea
