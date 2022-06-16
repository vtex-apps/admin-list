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
      <div style={{ padding: '0 4rem' }}>
        <DataView state={view}>
          <DataViewControls>
            <Search
              id="search"
              placeholder={formatMessage(table.searchList)}
              {...getInputProps()}
            />
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
      </div>
    </>
  )
}

export default TableUserArea
