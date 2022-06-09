import type { FC } from 'react'
import React from 'react'

import { useInterface } from '../hooks/useInterface'
import '../styles.global.css'

const TitleArea: FC = () => {
  const { infoUserList } = useInterface()

  return (
    <div>
      <p>
        <b>{infoUserList?.ownerName}</b>
        <br />
        {infoUserList?.ownerEmail}
      </p>
    </div>
  )
}

export default TitleArea
