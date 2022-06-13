import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import {
  Tag,
  useDataGridState,
  useDataViewState,
  useDropdownState,
} from '@vtex/admin-ui'

import searchListsRaw from '../queries/searchListsRaw.gql'
import { ContextLists } from '../hooks/useLists'
import {
  columns,
  messages,
  filterDate,
  filterStatus,
} from '../utils/definedMessages'
import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../utils/constants'
import { useInterface } from '../hooks/useInterface'

const ProviderLists: FC = (props) => {
  const { formatMessage } = useIntl()
  const [valuesLists, setValuesLists] = useState<ValuesLists[]>()
  const [itemsLists, setItemsLists] = useState<ItemsLists[]>()
  const [searchListRawQuery, { data: dataSearchListsRaw }] =
    useLazyQuery(searchListsRaw)

  const dateOptions = [
    { id: 1, label: formatMessage(filterDate.today) },
    { id: 2, label: formatMessage(filterDate.yesterday) },
    { id: 3, label: formatMessage(filterDate.thisWeek) },
    { id: 4, label: formatMessage(filterDate.lastWeek) },
    { id: 5, label: formatMessage(filterDate.thisMonth) },
    { id: 6, label: formatMessage(filterDate.lastMonth) },
    { id: 7, label: formatMessage(filterDate.thisYear) },
    { id: 8, label: formatMessage(filterDate.lastYear) },
    { id: 9, label: formatMessage(filterDate.customizer) },
  ]

  const dateState = useDropdownState({
    items: dateOptions,
    itemToString: (item) => (item ? item.label : ''),
    initialSelectedItem: { id: 0, label: formatMessage(filterDate.date) },
  })

  const statusOptions = [
    { id: 1, label: formatMessage(filterStatus.active) },
    { id: 2, label: formatMessage(filterStatus.disabled) },
  ]

  const statusState = useDropdownState({
    items: statusOptions,
    itemToString: (item) => (item ? item.label : ''),
    initialSelectedItem: { id: 0, label: formatMessage(filterStatus.status) },
  })

  const view = useDataViewState()

  const { searchEmailFilter } = useInterface()

  const gridLists = useDataGridState({
    view,
    columns: [
      {
        id: 'title',
        header: formatMessage(columns.title),
        sortable: true,
        width: '60%',
        resolver: {
          type: 'plain',
          render: ({ data }) => <b>{data}</b>,
        },
        compare: (a, b) => b.title.localeCompare(a.title),
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
        id: 'validate',
        header: formatMessage(columns.validate),
        resolver: {
          type: 'date',
          locale: LOCALE,
          options: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
      {
        id: 'status',
        header: formatMessage(columns.status),
        resolver: {
          type: 'plain',
          render: ({ data }) =>
            data ? (
              <Tag label={formatMessage(messages.active)} palette="green" />
            ) : (
              <Tag label={formatMessage(messages.disabled)} palette="red" />
            ),
        },
        sortable: true,
        compare: (a, b) => (b.status === a.status ? 0 : a.status ? -1 : 1),
      },
    ],
    items: itemsLists,
    length: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    const valuesSearchListsRaw: ValuesLists[] =
      dataSearchListsRaw?.searchListsRaw?.data

    setValuesLists(valuesSearchListsRaw)
  }, [dataSearchListsRaw])

  useEffect(() => {
    if (searchEmailFilter) {
      searchListRawQuery({
        variables: {
          page: 1,
          pageSize: 15,
          filter: { ownerEmail: searchEmailFilter },
        },
      })
    }
  }, [searchEmailFilter])

  useEffect(() => {
    const valueItems = valuesLists?.map((item) => {
      return {
        id: item?.id ? item.id : '',
        title: item?.name ? item.name : '',
        validate: item?.eventDate
          ? new Date(item.eventDate).valueOf()
          : new Date(2000, 1, 1).valueOf(),
        bought: item?.valuePurchased ? item.valuePurchased / 100 : 0,
        status: item?.eventDate ? new Date(item.eventDate) > new Date() : false,
      }
    })

    setItemsLists(valueItems)
  }, [valuesLists])

  return (
    <ContextLists.Provider
      value={{
        gridLists,
        view,
        dateOptions,
        dateState,
        statusOptions,
        statusState,
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderLists
