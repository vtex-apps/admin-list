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
  usePaginationState,
  useSearchState,
} from '@vtex/admin-ui'
import { FormattedMessage, useIntl } from 'react-intl'

import { ITEMS_PER_PAGE } from '../utils/constants'
import { messages, table } from '../utils/definedMessages'
import { useUser } from '../hooks/useUser'

const TableUserArea: FC = () => {
  const { gridUsers, view } = useUser()
  const search = useSearchState()

  const { formatMessage } = useIntl()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: 45,
  })

  if (Object.keys(gridUsers).length < 1 && Object.keys(view).length < 1) {
    return <></>
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
              placeholder={formatMessage(table.searchUser)}
              state={search}
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
