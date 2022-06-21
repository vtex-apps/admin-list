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
  usePaginationState,
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
  const [totalPagination, setTotalPagination] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<string | null>()
  const [selectedStatus, setSelectedStatus] = useState<string | null>()
  const [minimunDate, setMinimunDate] = useState(new Date())
  const [searchListRawQuery, { data: dataSearchListsRaw, loading }] =
    useLazyQuery(searchListsRaw)

  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
  })

  const {
    getInputProps,
    value: search,
    debouncedValue,
  } = useSearchState({
    timeout: 500,
  })

  useEffect(() => {
    pagination.paginate({
      type: 'setTotal',
      total: totalPagination,
    })
  }, [totalPagination])

  const modalState = useModalState({ visible: false })

  const { searchEmailFilter, infoUserList, setInfoUserList } = useInterface()

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
    onChange: ({ selected }) => setSelectedDate(selected),
    label: formatMessage(filterDate.date),
  })

  const statusOptions = [
    { id: '1', label: formatMessage(filterStatus.active), value: 1 },
    { id: '2', label: formatMessage(filterStatus.disabled), value: 2 },
  ]

  const statusState = useFilterState({
    items: statusOptions,
    onChange: ({ selected }) => setSelectedStatus(selected),
    label: formatMessage(filterStatus.status),
  })

  useEffect(() => {
    if (selectedDate === '9') {
      modalState.setVisible(true)
    }
  }, [selectedDate])

  useEffect(() => {
    const filter = {
      name: debouncedValue ?? null,
      ownerEmail: searchEmailFilter ?? null,
      eventDateRange: selectedStatus ? dictionaryStatus[selectedStatus] : null,
      createdDateRange: selectedDate ? dictionaryDate[selectedDate] : null,
    }

    searchListRawQuery({
      variables: {
        filter,
        page: pagination.currentPage,
        pageSize: ITEMS_PER_PAGE,
      },
    })
  }, [
    debouncedValue,
    selectedDate,
    pagination.currentPage,
    selectedStatus,
    infoUserList?.ownerEmail,
    searchEmailFilter,
  ])

  function salveDatePersonalizate() {
    dictionaryDate[9] = {
      startDate: new Date(
        datePersonalizeInitial.calendarState.dateValue
      ).toISOString(),
      endDate: new Date(
        datePersonalizeFinal.calendarState.dateValue
      ).toISOString(),
    }
    modalState.setVisible(false)
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
        width: '50%',
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
    if (loading) {
      view.setStatus({
        type: 'loading',
      })
    }

    if (itemsLists?.length === 0 && !loading) {
      view.setStatus({
        type: 'empty',
        message: 'Vazio',
      })
    }

    if (itemsLists?.length !== 0 && !loading) {
      view.setStatus({
        type: 'ready',
      })
    }
  }, [loading])

  useEffect(() => {
    const valuesSearchListsRaw: ValuesLists[] =
      dataSearchListsRaw?.searchListsRaw?.data

    setValuesLists(valuesSearchListsRaw)

    if (
      dataSearchListsRaw?.searchListsRaw?.pagination?.total !== undefined &&
      pagination.total !== dataSearchListsRaw?.searchListsRaw?.pagination?.total
    ) {
      setTotalPagination(dataSearchListsRaw?.searchListsRaw?.pagination?.total)
    }

    const totalizer = dataSearchListsRaw?.searchListsRaw?.totalizer

    setInfoUserList({ ...infoUserList, ...totalizer })
  }, [dataSearchListsRaw])

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
        status: item?.eventDate ? new Date(item.eventDate) >= today : false,
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
        pagination,
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderLists
