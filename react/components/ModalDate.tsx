import {
  Button,
  experimental_DatePickerCalendar,
  experimental_DatePickerField,
  experimental_I18nProvider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@vtex/admin-ui'
import type { FC } from 'react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useLists } from '../hooks/useLists'
import { LOCALE } from '../utils/constants'
import { modal } from '../utils/definedMessages'

const ModalDateArea: FC = () => {
  const {
    modalState,
    datePersonalizeInitial,
    datePersonalizeFinal,
    salveDatePersonalizate,
  } = useLists()

  const { formatMessage } = useIntl()

  const DatePickerField = experimental_DatePickerField
  const DatePickerCalendar = experimental_DatePickerCalendar
  const I18nProvider = experimental_I18nProvider

  return (
    <Modal aria-label="Small" state={modalState} size="small">
      <ModalHeader title="Small" />
      <ModalContent>
        <I18nProvider locale={LOCALE}>
          <div style={{ paddingBottom: '15px' }}>
            <DatePickerField
              label={formatMessage(modal.dateInitial)}
              state={datePersonalizeInitial}
            />
            <DatePickerCalendar
              state={datePersonalizeInitial}
              csx={{ zIndex: 100000 }}
            />
          </div>
          <DatePickerField
            label={formatMessage(modal.dateFinal)}
            state={datePersonalizeFinal}
          />
          <DatePickerCalendar
            state={datePersonalizeFinal}
            csx={{ zIndex: 100000 }}
          />
        </I18nProvider>
      </ModalContent>
      <ModalFooter>
        <Button
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault()
            salveDatePersonalizate()
          }}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDateArea
