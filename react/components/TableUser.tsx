import type { FC } from 'react'
import React from 'react'
import {
  DataGrid,
  DataView,
  DataViewControls,
  FlexSpacer,
  PageHeader,
  PageTitle,
  Pagination,
  Search,
  tag,
} from '@vtex/admin-ui'
import { FormattedMessage, useIntl } from 'react-intl'

import { messages, table } from '../utils/definedMessages'
import { useUser } from '../hooks/useUser'

const TableUserArea: FC = () => {
  const { gridUsers, view, getInputProps, pagination } = useUser()

  const { formatMessage } = useIntl()

  if (Object.keys(gridUsers).length < 1 && Object.keys(view).length < 1) {
    return null
  }

  return (
    <>
      <PageHeader>
        <PageTitle style={{ padding: '0 4rem' }}>
          <FormattedMessage {...messages.titleUser} />
        </PageTitle>
      </PageHeader>
      <tag.div
        csx={{
          padding: '0 4rem',
        }}
      >
        <DataView state={view}>
          <DataViewControls>
            <tag.div>
              <Search id="search" {...getInputProps()} />
              <tag.p style={{ fontSize: '0.75rem', marginTop: '2px' }}>
                {formatMessage(table.searchUser)}
              </tag.p>
            </tag.div>
            <FlexSpacer />
            <Pagination
              state={pagination}
              preposition={formatMessage(table.paginationPreposition)}
              subject={formatMessage(table.paginationSubject)}
              prevLabel={formatMessage(table.paginationPrevious)}
              nextLabel={formatMessage(table.paginationNext)}
            />
          </DataViewControls>
          <DataGrid state={gridUsers} />
        </DataView>
      </tag.div>
    </>
  )
}

export default TableUserArea
