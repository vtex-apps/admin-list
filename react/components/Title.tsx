import type { FC } from 'react'
import React from 'react'
import { Tag } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { useInterface } from '../hooks/useInterface'
import { messages } from '../utils/definedMessages'
import '../styles.global.css'

const TitleArea: FC = () => {
  const { infoUserList } = useInterface()

  const { formatMessage } = useIntl()

  return (
    <div className="infoUser">
      <div>
        <p>
          <b>{infoUserList?.ownerName}</b>
          <br />
          {infoUserList?.ownerEmail}
        </p>
      </div>
      <div>
        {infoUserList?.status ? (
          <Tag label={formatMessage(messages.active)} palette="green" />
        ) : (
          <Tag label={formatMessage(messages.disabled)} palette="red" />
        )}
      </div>
    </div>
  )
}

export default TitleArea
