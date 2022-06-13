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
  PageHeader,
  PageTitle,
  Toolbar,
  ToolbarItem,
  useToolbarState,
  experimental_Filter,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { useLists } from '../hooks/useLists'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { table } from '../utils/definedMessages'
import { useInterface } from '../hooks/useInterface'
import TitleArea from './Title'
import TotalizerArea from './Totalizer'
import '../styles.global.css'
import ModalDateArea from './ModalDate'

const TableListArea: FC = () => {
  const { gridLists, view, dateState, statusState, getInputProps } = useLists()

  const Filter = experimental_Filter

  const { setTableLists } = useInterface()
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
              {...getInputProps()}
            />
            <Toolbar state={toolbar} aria-label="Toolbar Render Props">
              <ToolbarItem>{() => <Filter state={dateState} />}</ToolbarItem>
              <ToolbarItem>{() => <Filter state={statusState} />}</ToolbarItem>
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

      <ModalDateArea />
    </>
  )
}

export default TableListArea
