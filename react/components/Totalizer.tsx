import {
  Flex,
  Text,
  Set,
  Card,
  Divider,
  Tooltip,
  IconWarningCircle,
} from '@vtex/admin-ui'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import { useInterface } from '../hooks/useInterface'
import { totalizer } from '../utils/definedMessages'

const TotalizerArea = () => {
  const intl = useIntl()

  const { infoUserList } = useInterface()

  const { culture } = useRuntime()

  return (
    <Card>
      <Flex justify="space-between">
        <Flex grow={1}>
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(totalizer.listsCreated)}
            </Text>
            <Text variant="pageTitle" tone="positive">
              <b>{infoUserList?.lists}</b>
            </Text>
          </Set>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6, marginY: -25 }} />
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Flex>
              <Text variant="pageTitle">
                {intl.formatMessage(totalizer.bought)}
              </Text>
            </Flex>
            <Text variant="pageTitle" tone="positive">
              <b>
                {infoUserList?.purchase
                  ? intl.formatNumber(infoUserList?.purchase / 100, {
                      style: 'currency',
                      currency: culture.currency,
                    })
                  : 0}
              </b>
            </Text>
          </Set>
        </Flex>
        <Flex grow={1}>
          <Divider orientation="vertical" csx={{ marginX: 6, marginY: -25 }} />
          <Set orientation="vertical" spacing={3} fluid csx={{ paddingX: 4 }}>
            <Text variant="pageTitle">
              {intl.formatMessage(totalizer.converted)}
              <Tooltip
                label={intl.formatMessage(totalizer.info)}
                placement="right"
              >
                <IconWarningCircle size="small" style={{ marginLeft: '2px' }} />
              </Tooltip>
            </Text>
            <Text variant="pageTitle" tone="positive">
              <b>
                {infoUserList?.quantityAlreadyInGiftCard
                  ? intl.formatNumber(infoUserList?.quantityAlreadyInGiftCard, {
                      style: 'currency',
                      currency: culture.currency,
                    })
                  : 0}
              </b>
            </Text>
          </Set>
        </Flex>
      </Flex>
    </Card>
  )
}

export default TotalizerArea
