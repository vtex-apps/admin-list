import { FC } from 'react'
import React from 'react'
import {
  DataGrid,
  DataView,
  DataViewControls,
  FlexSpacer,
  Pagination,
  Search,
  usePaginationState,
  useSearchState,
} from '@vtex/admin-ui'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { table } from '../utils/definedMessages'
import { useIntl } from 'react-intl'
import { useUser } from '../hooks/useUser'

const TableUserArea: FC = () => {
  const { gridUsers, view } = useUser()
  const search = useSearchState()
  
  const {formatMessage} = useIntl()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: 45,
  })

  if(Object.keys(gridUsers).length < 1 && Object.keys(view).length < 1) return <></>

  return ( 
    <div style={{ padding: '0 4rem' }}>
      <DataView state={view}>
        <DataViewControls>
          <Search id="search" placeholder="Search" state={search} />
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
  )
}

export default TableUserArea
