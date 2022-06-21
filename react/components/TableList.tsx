import type { FC } from 'react'
import React from 'react'
import {
  DataGrid,
  DataView,
  DataViewControls,
  FlexSpacer,
  Pagination,
  Search,
  PageHeader,
  PageTitle,
  Toolbar,
  ToolbarItem,
  useToolbarState,
  experimental_Filter,
  tag,
  Tooltip,
  IconWarningCircle,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'

import { useLists } from '../hooks/useLists'
import { table } from '../utils/definedMessages'
import { useInterface } from '../hooks/useInterface'
import TitleArea from './Title'
import TotalizerArea from './Totalizer'
import ModalDateArea from './ModalDate'

const TableListArea: FC = () => {
  const { gridLists, view, dateState, statusState, getInputProps, pagination } =
    useLists()

  const Filter = experimental_Filter

  const { setTableLists } = useInterface()
  const toolbar = useToolbarState()

  const { formatMessage } = useIntl()

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
      <tag.div
        csx={{
          padding: '0 4rem',
        }}
      >
        <DataView state={view}>
          <DataViewControls>
            <tag.div
              csx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '-4px',
              }}
            >
              <Search id="search" {...getInputProps()} />
              <Tooltip
                label={formatMessage(table.searchList)}
                placement="right"
              >
                <IconWarningCircle size="small" style={{ marginLeft: '2px' }} />
              </Tooltip>
            </tag.div>

            <Toolbar
              state={toolbar}
              aria-label="Toolbar Render Props"
              style={{ marginTop: '-10px' }}
            >
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
      </tag.div>

      <ModalDateArea />
    </>
  )
}

export default TableListArea
