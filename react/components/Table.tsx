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
import { useLists } from '../hooks/useLists'
import { ITEMS_PER_PAGE } from '../utils/constants'

const TableArea: FC = () => {
  const { grid, view } = useLists()
  const search = useSearchState()
  
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: 45,
  })

  if(Object.keys(grid).length < 1 && Object.keys(view).length < 1) return <></>

  return ( 
    <div style={{ padding: '0 4rem' }}>
      <DataView state={view}>
        <DataViewControls>
          <Search id="search" placeholder="Search" state={search} />
          <FlexSpacer />
          <Pagination
            state={pagination}
            preposition="of"
            subject="results"
            prevLabel="Previous"
            nextLabel="Next"
          />
        </DataViewControls>
        <DataGrid state={grid} />
      </DataView> 
    </div>
  )
}

export default TableArea
