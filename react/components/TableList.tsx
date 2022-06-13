import type { FC } from 'react'
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
  PageHeader,
  PageTitle,
  Toolbar,
  Dropdown,
  ToolbarItem,
  useToolbarState,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { useLists } from '../hooks/useLists'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { table } from '../utils/definedMessages'
import { useInterface } from '../hooks/useInterface'
import TitleArea from './Title'
import TotalizerArea from './Totalizer'
import '../styles.global.css'

const TableListArea: FC = () => {
  const {
    gridLists,
    view,
    dateState,
    dateOptions,
    statusOptions,
    statusState,
  } = useLists()

  const { setTableLists } = useInterface()
  const search = useSearchState()
  const toolbar = useToolbarState()

  const { formatMessage } = useIntl()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: 45,
  })

  if (Object.keys(gridLists).length < 1 && Object.keys(view).length < 1) {
    return null
  }

  return (
    <>
      <PageHeader onPopNavigation={() => setTableLists(false)}>
        <PageTitle style={{ padding: '0 4rem' }}>
          <TitleArea />
        </PageTitle>
      </PageHeader>
      <div style={{ padding: '0 4rem' }}>
        <DataView state={view}>
          <DataViewControls>
            <Search
              id="search"
              placeholder={formatMessage(table.searchList)}
              state={search}
            />
            <Toolbar state={toolbar}>
              <ToolbarItem>
                {() => (
                  <Dropdown
                    items={dateOptions}
                    state={dateState}
                    label="Date"
                    renderItem={(item) => item?.label}
                    variant="primary"
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {() => (
                  <Dropdown
                    items={statusOptions}
                    state={statusState}
                    label="Date"
                    renderItem={(item) => item?.label}
                    variant="primary"
                  />
                )}
              </ToolbarItem>
            </Toolbar>
            <FlexSpacer />
            <Pagination
              state={pagination}
              preposition={formatMessage(table.paginationPreposition)}
              subject={formatMessage(table.paginationSubject)}
              prevLabel={formatMessage(table.paginationPrevious)}
              nextLabel={formatMessage(table.paginationNext)}
            />
          </DataViewControls>
          <TotalizerArea />
          <DataGrid state={gridLists} style={{ marginTop: '24px' }} />
        </DataView>
      </div>
    </>
  )
}

export default TableListArea
