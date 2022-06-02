interface ValuesLists {
  id: string
  listType: string
  name: string
  active: boolean
  public: boolean
  otherName: string
  ownerName: string
  ownerEmail: string
  image: string
  backgroundImage: string
  quantityPurchased: number
  valuePurchased: number
  eventDate: string
  createdIn: string
}

interface ItemsLists {
  id: string
  title: string
  validate: number
  bought: number
  status: boolean
}

interface TotalizerListsUsers {
  ownerName: string
  ownerEmail: string
  lists: number
  purchase: number
  quantityAlreadyInGiftCard: number | undefined
  status: boolean
  id: string
}
