import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  createSystem,
  DataGrid,
  DataView,
  DataViewControls,
  FlexSpacer,
  PageHeader,
  PageTitle,
  Pagination,
  Search,
  Tag,
  useDataGridState,
  useDataViewState,
  usePaginationState,
  useSearchState,
} from '@vtex/admin-ui'
import faker from 'faker'
import { columns, messages } from './utils/definedMessages'
import { CURRENCY, ITEMS_PER_PAGE, LOCALE, NUMBER_OF_ITEMS } from './utils/constants'

const [ThemeProvider] = createSystem({
  key: 'admin-ui-example',
})

const items = Array(NUMBER_OF_ITEMS)
  .fill(NUMBER_OF_ITEMS)
  .map(() => {
    return {
      id: faker.unique(() => faker.datatype.number(1000)),
      title: faker.commerce.productName(),
      user: faker.commerce.productAdjective(),
      validate: faker.date.past().toDateString(),
      bought: faker.commerce.price(),
      converted: faker.datatype.number(1000),
      status: true,
    }
  })

function Interface() {

  const { formatMessage } = useIntl()

  const view = useDataViewState()
  const search = useSearchState()

  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: NUMBER_OF_ITEMS,
  })

  const grid = useDataGridState({
    view,
    columns: [
      {
        id: 'title',
        header: formatMessage(columns.title),
      },
      {
        id: 'user',
        header: formatMessage(columns.user),
      },
      {
        id: 'validate',
        header: formatMessage(columns.validate),
      },
      {
        id: 'bought',
        header: formatMessage(columns.bought),
        resolver: {
          type: 'currency',
          locale: LOCALE,
          currency: CURRENCY,
        },
      },
      {
        id: 'converted',
        header:formatMessage(columns.converted),
        resolver: {
          type: 'currency',
          locale: LOCALE,
          currency: CURRENCY,
        },
      },
      {
        id: 'status',
        header: formatMessage(columns.status),
        resolver: {
          type: 'plain',
          render: ({ data }) =>
            data ? (
              <Tag
                label={formatMessage(
                  messages.active
                )}
                palette="green"
              />
            ) : (
              <Tag
                label= {formatMessage(
                  messages.disabled
                )}
                palette="red"
              />
            ),
        },
        sortable: true,
      },
    ],
    items,
    length: ITEMS_PER_PAGE,
  })

  return (
    <ThemeProvider>
        <PageHeader>
          <PageTitle>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </PageHeader>

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
      </ThemeProvider>
     
  )
}

export default Interface
