import { tag } from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'

import { useInterface } from '../hooks/useInterface'

const TitleArea: FC = () => {
  const { infoUserList } = useInterface()

  return (
    <tag.div>
      <tag.p>
        <b>{infoUserList?.ownerName}</b>
        <br />
        {infoUserList?.ownerEmail}
      </tag.p>
    </tag.div>
  )
}

export default TitleArea
