import type {
  UsePaginationReturn,
  DataGridState,
  DataViewState,
  GetInputPropsReturn,
  ModalStateReturn,
} from '@vtex/admin-ui'
import type { DatePickerStateReturn } from '@vtex/admin-ui/dist/declarations/src/date-picker'
import type { UseFilterStateReturn } from '@vtex/admin-ui/dist/declarations/src/filters'
import React, { useContext } from 'react'

interface ContextLists {
  gridLists: DataGridState<ItemsLists>
  view: DataViewState
  dateState: UseFilterStateReturn<{
    id: string
    label: string
    value: number
  }>
  statusState: UseFilterStateReturn<{
    id: string
    label: string
    value: number
  }>
  search: string
  getInputProps: () => GetInputPropsReturn
  debouncedValue: string
  modalState: ModalStateReturn
  datePersonalizeInitial: DatePickerStateReturn
  datePersonalizeFinal: DatePickerStateReturn
  salveDatePersonalizate: () => void
  pagination: UsePaginationReturn
}

export const ContextLists = React.createContext<ContextLists>({
  gridLists: {} as DataGridState<ItemsLists>,
  view: {} as DataViewState,
  dateState: {} as UseFilterStateReturn<{
    id: string
    label: string
    value: number
  }>,
  statusState: {} as UseFilterStateReturn<{
    id: string
    label: string
    value: number
  }>,
  search: '',
  getInputProps: () => ({} as GetInputPropsReturn),
  debouncedValue: '',
  modalState: {} as ModalStateReturn,
  datePersonalizeInitial: {} as DatePickerStateReturn,
  datePersonalizeFinal: {} as DatePickerStateReturn,
  salveDatePersonalizate: () => {},
  pagination: {} as UsePaginationReturn,
})

export function useLists() {
  return useContext(ContextLists)
}
