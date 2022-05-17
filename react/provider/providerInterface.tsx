import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

import searchListsRaw from '../queries/searchListsRaw.gql'
import searchGiftCards from '../queries/searchGiftCards.gql'
import { ContextLists } from '../hooks/useLists'
import { columns, messages } from '../utils/definedMessages'
import { useIntl } from 'react-intl'
import { Tag, useDataGridState, useDataViewState } from '@vtex/admin-ui'
import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../utils/constants'

const ProviderInterface: FC = (props) => {  
  const { data: dataSearchListsRaw } = useQuery(searchListsRaw, {variables: {page: 1, pageSize: 15}})
  const { data: dataSearchGiftCards } = useQuery(searchGiftCards, {variables: {page: 1, pageSize: 15}})
  const [valuesLists, setValuesLists] = useState<ValuesLists[]>()
  const [valuesGiftCard, setValuesGiftCard] = useState<ValuesGiftCard[]>()
  const [items, setItems] = useState<Items[]>()
  
  const view = useDataViewState()
  const { formatMessage } = useIntl()

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
    items: items,
    length: ITEMS_PER_PAGE,
  })
  
  useEffect(() => {
    const valuesSearchListsRaw: ValuesLists[] = dataSearchListsRaw?.searchListsRaw?.data
    setValuesLists(valuesSearchListsRaw)
  }, [dataSearchListsRaw])

  useEffect(() => {
    const valuesSearchGiftCards: ValuesGiftCard[] = dataSearchGiftCards?.searchGiftCards?.data
    setValuesGiftCard(valuesSearchGiftCards)
  }, [dataSearchGiftCards])


  useEffect(() => {
    const valueItems = valuesLists?.map((item) => {
       return {
        id: item?.id ? item.id : '',
        title: item?.name ? item.name : '',
        user: item?.ownerName ? item.ownerName : '',
        validate: item?.eventDate ?  (new Date(item.eventDate)).valueOf() : new Date().valueOf(),
        bought: item?.valuePurchased ? (item.valuePurchased)/100 : 0,
        converted: 1000.0,
        status: item?.eventDate ?  new Date(item.eventDate) > new Date() : false,
      }
    })
    setItems(valueItems) 
  }, [valuesLists, valuesGiftCard])
 

 
  return (
    <ContextLists.Provider
      value={{
        grid,
        view
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderInterface
