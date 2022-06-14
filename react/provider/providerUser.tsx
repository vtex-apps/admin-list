import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from 'react-apollo'
import { useIntl } from 'react-intl'
import {
  Tag,
  useDataGridState,
  useDataViewState,
  IconArrowUpRight,
  useSearchState,
} from '@vtex/admin-ui'

import searchGiftCards from '../queries/searchGiftCards.gql'
import searchUser from '../queries/searchUser.gql'
import searchListUser from '../queries/searchListUser.gql'
import { ContextUser } from '../hooks/useUser'
import { columns, messages } from '../utils/definedMessages'
import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../utils/constants'
import { useInterface } from '../hooks/useInterface'

interface Props {
  children?: React.ReactNode
}

const ProviderUser: FC = (props: Props) => {
  const [valuesGiftCard, setValuesGiftCard] = useState<ValuesGiftCard[]>()
  const [valuesUser, setValuesUser] = useState<ValuesUser[]>()
  const [valuesListsUser, setValuesListsUser] = useState<ValuesListsUsers[]>()
  const [itemsListsUsers, setItemsListsUsers] = useState<ItemsListsUsers[]>()
  const [emailFilter, setEmailFilter] = useState<string>()
  const [emailFilterGiftCard, setEmailFilterGiftCard] = useState<string>()
  const { data: dataSearchUser } = useQuery(searchUser, {
    variables: { page: 1, pageSize: 15 },
  })

  const {
    getInputProps,
    value: search,
    debouncedValue,
  } = useSearchState({
    timeout: 500,
  })

  const [searchListUserQuery, { data: dataSearchListsUser }] =
    useLazyQuery(searchListUser)

  const [searchGiftCardQuery, { data: dataSearchGiftCards }] =
    useLazyQuery(searchGiftCards)

  const view = useDataViewState()
  const { formatMessage } = useIntl()

  const { setTableLists, setSearchEmailFilter, setInfoUserList } =
    useInterface()

  function openTableList(
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    email: any
  ) {
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
            <IconArrowUpRight onClick={(event) => openTableList(event, data)} />
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
          locale: LOCALE,
          currency: CURRENCY,
        },
      },
      {
        id: 'converted',
        header: formatMessage(columns.converted),
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
              <Tag label={formatMessage(messages.active)} palette="green" />
            ) : (
              <Tag label={formatMessage(messages.disabled)} palette="red" />
            ),
        },
        sortable: true,
        compare: (a, b) => (b.status === a.status ? 0 : a.status ? -1 : 1),
      },
    ],
    items: itemsListsUsers,
    length: ITEMS_PER_PAGE,
  })

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
    const valuesSearcUser: ValuesUser[] = dataSearchUser?.allUsers?.data

    setValuesUser(valuesSearcUser)
  }, [dataSearchUser])

  useEffect(() => {
    if (valuesUser !== undefined && valuesUser.length > 0) {
      let filter = valuesUser[0].email
      let filterGift = valuesUser[0].email

      for (let index = 1; index < valuesUser.length; index++) {
        filter += ` OR ownerEmail=${valuesUser[index].email}`
        filterGift += ` OR email=${valuesUser[index].email}`
      }

      setEmailFilter(filter)
      setEmailFilterGiftCard(filterGift)
    }
  }, [valuesUser])

  useEffect(() => {
    if (emailFilter) {
      searchListUserQuery({
        variables: {
          page: 1,
          pageSize: 15,
          filter: { ownerEmail: emailFilter },
        },
      })

      searchGiftCardQuery({
        variables: {
          page: 1,
          pageSize: 15,
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
        table: item?.ownerEmail ? item.ownerEmail : '',
        id: item?.id ? item.id : '',
        owner: item?.ownerEmail
          ? { ownerEmail: item.ownerEmail, ownerName: item.ownerName }
          : '',
        lists: item?.lists ? item.lists : 0,
        bought: item?.purchase ? item.purchase / 100 : 0,
        converted: valueGift ? valueGift.quantityAlreadyInGiftCard : 0,
        status: item?.status ? item?.status : false,
      }
    })

    setItemsListsUsers(valueItems)
  }, [valuesListsUser, valuesGiftCard])

  useEffect(() => {
    searchListUserQuery({
      variables: {
        filter: { ownerEmail: debouncedValue },
        page: 1,
        pageSize: ITEMS_PER_PAGE,
      },
    })
  }, [debouncedValue, search])

  return (
    <ContextUser.Provider
      value={{
        gridUsers,
        view,
        search,
        getInputProps,
        debouncedValue,
      }}
    >
      {props.children}
    </ContextUser.Provider>
  )
}

export default ProviderUser
