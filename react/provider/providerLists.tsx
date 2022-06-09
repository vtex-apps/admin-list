import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import {
  Button,
  experimental_useDatePickerState,
  experimental_useFilterState,
  IconEye,
  Tag,
  Tooltip,
  useDataGridState,
  useDataViewState,
  useModalState,
  useSearchState,
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
import { dictionaryDate, dictionaryStatus, today } from '../utils/dictionary'

const ProviderLists: FC = (props) => {
  const useFilterState = experimental_useFilterState
  const useDatePickerState = experimental_useDatePickerState
  const { formatMessage } = useIntl()
  const [valuesLists, setValuesLists] = useState<ValuesLists[]>()
  const [itemsLists, setItemsLists] = useState<ItemsLists[]>()
  const [minimunDate, setMinimunDate] = useState(new Date())
  const [searchListRawQuery, { data: dataSearchListsRaw }] =
    useLazyQuery(searchListsRaw)

  const {
    getInputProps,
    value: search,
    debouncedValue,
  } = useSearchState({
    timeout: 500,
  })

  const modalState = useModalState({ visible: false })

  const { searchEmailFilter, infoUserList } = useInterface()

  useEffect(() => {
    searchListRawQuery({
      variables: {
        filter: {
          name: debouncedValue,
          ownerEmail: infoUserList?.ownerEmail,
        },
        page: 1,
        pageSize: ITEMS_PER_PAGE,
      },
    })
  }, [debouncedValue])

  const datePersonalizeInitial = useDatePickerState({
    minValue: {
      year: 2022,
      month: 0,
      day: 1,
    },
    maxValue: {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate() + 1,
    },
  })

  const datePersonalizeFinal = useDatePickerState({
    minValue: {
      year: minimunDate.getFullYear(),
      month: minimunDate.getMonth(),
      day: minimunDate.getDate(),
    },
    maxValue: {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate() + 1,
    },
  })

  useEffect(() => {
    setMinimunDate(new Date(datePersonalizeInitial.calendarState.dateValue))
  }, [datePersonalizeInitial.calendarState.dateValue])

  const dateOptions = [
    { id: '1', label: formatMessage(filterDate.today), value: 1 },
    { id: '2', label: formatMessage(filterDate.yesterday), value: 2 },
    { id: '3', label: formatMessage(filterDate.thisWeek), value: 3 },
    { id: '4', label: formatMessage(filterDate.lastWeek), value: 4 },
    { id: '5', label: formatMessage(filterDate.thisMonth), value: 5 },
    { id: '6', label: formatMessage(filterDate.lastMonth), value: 6 },
    { id: '7', label: formatMessage(filterDate.thisYear), value: 7 },
    { id: '8', label: formatMessage(filterDate.lastYear), value: 8 },
    { id: '9', label: formatMessage(filterDate.customizer), value: 9 },
  ]

  const dateState = useFilterState({
    items: dateOptions,
    onChange: ({ selected }) => changeFilterDate(selected),
    label: formatMessage(filterDate.date),
  })

  const statusOptions = [
    { id: '1', label: formatMessage(filterStatus.active), value: 1 },
    { id: '2', label: formatMessage(filterStatus.disabled), value: 2 },
  ]

  const statusState = useFilterState({
    items: statusOptions,
    onChange: ({ selected }) => changeFilterStatus(selected),
    label: formatMessage(filterStatus.status),
  })

  function changeFilterStatus(selected: string | null) {
    searchListRawQuery({
      variables: {
        page: 1,
        pageSize: 15,
        filter: {
          ownerEmail: searchEmailFilter,
          eventDateRange: selected ? dictionaryStatus[selected] : null,
        },
      },
    })
  }

  function changeFilterDate(selected: string | null) {
    if (selected === '9') modalState.setVisible(true)
    searchListRawQuery({
      variables: {
        page: 1,
        pageSize: 15,
        filter: {
          ownerEmail: searchEmailFilter,
          createdDateRange: selected ? dictionaryDate[selected] : null,
        },
      },
    })
  }

  function salveDatePersonalizate() {
    modalState.setVisible(false)
    searchListRawQuery({
      variables: {
        page: 1,
        pageSize: 15,
        filter: {
          ownerEmail: searchEmailFilter,
          createdDateRange: {
            startDate: new Date(
              datePersonalizeInitial.calendarState.dateValue
            ).toISOString(),
            endDate: new Date(
              datePersonalizeFinal.calendarState.dateValue
            ).toISOString(),
          },
        },
      },
    })
  }

  const view = useDataViewState()

  const gridLists = useDataGridState({
    view,
    columns: [
      {
        id: 'list',
        width: '2%',
        resolver: {
          type: 'plain',
          render: ({ data }) => (
            <Tooltip
              label={formatMessage(columns.tooltipList)}
              placement="right"
            >
              <Button
                icon={<IconEye />}
                variant="tertiary"
                onClick={() =>
                  window.open(`${window.location.origin}/lists/${data}/guest`)
                }
              />
            </Tooltip>
          ),
        },
      },
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
        id: item.id ?? '',
        list: item.id ?? '',
        title: item.name ?? '',
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
        dateState,
        statusState,
        search,
        getInputProps,
        debouncedValue,
        modalState,
        datePersonalizeInitial,
        datePersonalizeFinal,
        salveDatePersonalizate,
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderLists
