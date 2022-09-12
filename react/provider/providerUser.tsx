import type { FC, SyntheticEvent } from 'react'
import React, { useEffect, useState, useMemo } from 'react'
import { useLazyQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import {
  Tag,
  useDataGridState,
  useDataViewState,
  IconArrowUpRight,
  useSearchState,
  Tooltip,
  Button,
  usePaginationState,
} from '@vtex/admin-ui'
import { useRuntime } from 'vtex.render-runtime'

import searchGiftCards from '../queries/searchGiftCards.gql'
import searchUser from '../queries/searchUser.gql'
import searchListUser from '../queries/searchListUser.gql'
import { ContextUser } from '../hooks/useUser'
import { columns, messages } from '../utils/definedMessages'
import { ITEMS_PER_PAGE } from '../utils/constants'
import { useInterface } from '../hooks/useInterface'

interface Props {
  children?: React.ReactNode
}

const ProviderUser: FC = (props: Props) => {
  const { culture } = useRuntime()
  const [valuesGiftCard, setValuesGiftCard] = useState<ValuesGiftCard[]>()
  const [valuesUser, setValuesUser] = useState<ValuesUser[]>()
  const [valuesListsUser, setValuesListsUser] = useState<ValuesListsUsers[]>()
  const [itemsListsUsers, setItemsListsUsers] = useState<ItemsListsUsers[]>()
  const [emailFilter, setEmailFilter] = useState<string[]>()
  const [totalPagination, setTotalPagination] = useState<number>(0)
  const [emailFilterGiftCard, setEmailFilterGiftCard] = useState<string>()
  const pagination = usePaginationState({
    pageSize: ITEMS_PER_PAGE,
    total: 0,
  })

  useEffect(() => {
    pagination.paginate({
      type: 'setTotal',
      total: totalPagination,
    })
  }, [totalPagination])

  const {
    getInputProps,
    value: search,
    debouncedValue,
    setValue,
  } = useSearchState({
    timeout: 500,
  })

  const [
    searchListUserQuery,
    { data: dataSearchListsUser, loading: loadingSearchListUser },
  ] = useLazyQuery(searchListUser)

  const [
    searchGiftCardQuery,
    { data: dataSearchGiftCards, loading: loadingSearchGiftCard },
  ] = useLazyQuery(searchGiftCards)

  const [
    searchUsersQuery,
    { data: dataSearchUser, loading: loadingSearchUser },
  ] = useLazyQuery(searchUser)

  const view = useDataViewState()

  const { formatMessage } = useIntl()

  const { setTableLists, setSearchEmailFilter, setInfoUserList, tableLists } =
    useInterface()

  function openTableList(event: SyntheticEvent, email: any) {
    event.preventDefault()
    setTableLists(true)
    setSearchEmailFilter(email)
    const valueUser = valuesListsUser?.find(
      (element) => element.ownerEmail === email
    )

    const valueGift = valuesGiftCard?.find((element) => element.email === email)

    if (valueUser !== undefined) {
      setInfoUserList({
        ...valueUser,
        ...{ quantityAlreadyInGiftCard: valueGift?.quantityAlreadyInGiftCard },
      })
    }
  }

  const gridUsers = useDataGridState({
    view,
    columns: [
      {
        id: 'table',
        width: '2%',
        resolver: {
          type: 'plain',
          render: ({ data }) => (
            <Tooltip
              label={formatMessage(columns.tooltipUser)}
              placement="right"
            >
              <Button
                icon={<IconArrowUpRight />}
                variant="tertiary"
                onClick={(event: SyntheticEvent) => openTableList(event, data)}
              />
            </Tooltip>
          ),
        },
      },
      {
        id: 'owner',
        header: formatMessage(columns.owner),
        resolver: {
          type: 'plain',
          render: ({ data }: { data: any }) =>
            data ? (
              <>
                <b>{data.ownerName}</b>
                <p>{data.ownerEmail}</p>
              </>
            ) : undefined,
        },
      },
      {
        id: 'lists',
        header: formatMessage(columns.lists),
      },
      {
        id: 'bought',
        header: formatMessage(columns.bought),
        resolver: {
          type: 'currency',
          locale: culture.locale,
          currency: culture.currency,
        },
      },
      {
        id: 'converted',
        header: formatMessage(columns.converted),
        resolver: {
          type: 'currency',
          locale: culture.locale,
          currency: culture.currency,
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
      },
    ],
    items: itemsListsUsers,
    length: ITEMS_PER_PAGE,
  })

  const loading = useMemo(() => {
    return loadingSearchGiftCard || loadingSearchUser || loadingSearchListUser
  }, [loadingSearchGiftCard, loadingSearchListUser, loadingSearchUser])

  useEffect(() => {
    if (loading && view.status !== 'loading') {
      view.setStatus({
        type: 'loading',
      })
    } else {
      view.setStatus({
        type: 'ready',
      })
    }
  }, [loading])

  useEffect(() => {
    const valuesSearchListsUser: ValuesListsUsers[] =
      dataSearchListsUser?.searchListUser

    setValuesListsUser(valuesSearchListsUser)
  }, [dataSearchListsUser])

  useEffect(() => {
    const valuesSearchGiftCards: ValuesGiftCard[] =
      dataSearchGiftCards?.searchGiftCards?.data

    setValuesGiftCard(valuesSearchGiftCards)
  }, [dataSearchGiftCards])

  useEffect(() => {
    setValuesUser(dataSearchUser?.allUsers?.data ?? undefined)

    if (
      dataSearchUser?.allUsers?.pagination?.total !== undefined &&
      pagination.total !== dataSearchUser?.allUsers?.pagination?.total
    ) {
      setTotalPagination(dataSearchUser?.allUsers?.pagination?.total)
    }
  }, [dataSearchUser])

  useEffect(() => {
    if (valuesUser !== undefined && valuesUser.length > 0) {
      const filter: string[] = []

      filter[0] = valuesUser[0].email
      let filterGift = valuesUser[0].email

      for (let index = 1; index < valuesUser.length; index++) {
        filterGift += ` OR email=${valuesUser[index].email}`
        filter[index] = valuesUser[index].email
      }

      setEmailFilter(filter)
      setEmailFilterGiftCard(filterGift)
    }
  }, [valuesUser])

  useEffect(() => {
    if (emailFilter) {
      searchListUserQuery({
        variables: {
          filter: emailFilter,
        },
      })

      searchGiftCardQuery({
        variables: {
          page: pagination.currentPage,
          pageSize: ITEMS_PER_PAGE,
          filter: { email: emailFilterGiftCard },
          sorting: { field: 'email', order: 'ASC' },
        },
      })
    }
  }, [emailFilter, emailFilterGiftCard])

  useEffect(() => {
    const valueItems = valuesListsUser?.map((item) => {
      const valueGift = valuesGiftCard?.find(
        (element) => element.email === item.ownerEmail
      )

      return {
        table: item.ownerEmail ?? '',
        id: item.id ?? '',
        owner: item?.ownerEmail
          ? { ownerEmail: item.ownerEmail, ownerName: item.ownerName }
          : '',
        lists: item.lists ?? 0,
        bought: item?.purchase ? item.purchase / 100 : 0,
        converted: valueGift ? valueGift.quantityAlreadyInGiftCard : 0,
        status: item.status ?? false,
      }
    })

    setItemsListsUsers(valueItems)
  }, [valuesListsUser, valuesGiftCard])

  useEffect(() => {
    const filter = debouncedValue ? { email: debouncedValue } : null

    setItemsListsUsers(undefined)
    searchUsersQuery({
      variables: {
        filter,
        page: pagination.currentPage,
        pageSize: ITEMS_PER_PAGE,
      },
    })
  }, [debouncedValue, pagination.currentPage])

  useEffect(() => {
    setValue('')
  }, [tableLists])

  return (
    <ContextUser.Provider
      value={{
        gridUsers,
        view,
        search,
        getInputProps,
        debouncedValue,
        pagination,
      }}
    >
      {props.children}
    </ContextUser.Provider>
  )
}

export default ProviderUser
