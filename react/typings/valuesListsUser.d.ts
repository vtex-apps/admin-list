interface ValuesListsUsers {
  id: string
  ownerName: string
  ownerEmail: string
  purchase: number
  lists: number
  status: boolean
}

interface Owner {
  ownerEmail: string
  ownerName: string
}

interface ItemsListsUsers {
  table: string
  id: string
  owner: Owner | string
  lists: number
  bought: number
  converted: number
  status: boolean
}
