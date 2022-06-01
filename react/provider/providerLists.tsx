import React, { FC, useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'

import searchListsRaw from '../queries/searchListsRaw.gql'
import { ContextLists } from '../hooks/useLists'
import { columns, messages } from '../utils/definedMessages'
import { useIntl } from 'react-intl'
import { Tag, useDataGridState, useDataViewState } from '@vtex/admin-ui'
import { CURRENCY, ITEMS_PER_PAGE, LOCALE } from '../utils/constants'
import { useInterface } from '../hooks/useInterface'

const ProviderLists: FC = (props) => {  
  const [valuesLists, setValuesLists] = useState<ValuesLists[]>()
  const [itemsLists, setItemsLists] = useState<ItemsLists[]>()
  const [searchListRawQuery, { data: dataSearchListsRaw }] = useLazyQuery(searchListsRaw)
  
  const view = useDataViewState()
  const { formatMessage } = useIntl()

  const { searchEmailFilter } = useInterface()

  const gridLists = useDataGridState({
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
    items: itemsLists,
    length: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    const valuesSearchListsRaw: ValuesLists[] = dataSearchListsRaw?.searchListsRaw?.data
    setValuesLists(valuesSearchListsRaw)
  }, [dataSearchListsRaw])

  useEffect(() => {
    if(searchEmailFilter){
      searchListRawQuery({
      variables: {
        page: 1, 
        pageSize: 15, 
        filter: { ownerEmail: searchEmailFilter },
    }})
  }
  }, [searchEmailFilter])


  useEffect(() => {
    const valueItems = valuesLists?.map((item) => {
       return {
        id: item?.id ? item.id : '',
        title: item?.name ? item.name : '',
        user: item?.ownerName ? item.ownerName : '',
        validate: item?.eventDate ?  (new Date(item.eventDate)).valueOf() : new Date().valueOf(),
        bought: item?.valuePurchased ? (item.valuePurchased)/100 : 0,
        converted: 1000,
        status: item?.eventDate ?  new Date(item.eventDate) > new Date() : false,
      }
    })
    setItemsLists(valueItems) 
  }, [valuesLists])
 

  return (
    <ContextLists.Provider
      value={{
        gridLists,
        view
      }}
    >
      {props.children}
    </ContextLists.Provider>
  )
}

export default ProviderLists