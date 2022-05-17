import React from 'react'
import {
  createSystem,
  PageHeader,
  PageTitle,
  
} from '@vtex/admin-ui'
import ProviderInterface from './provider/providerInterface'
import Table from './components/Table'
import { FormattedMessage } from 'react-intl'
import { messages } from './utils/definedMessages'

const [ThemeProvider] = createSystem({
  key: 'admin-ui-example',
})

function Interface() {

  return (
    <ProviderInterface>
      <ThemeProvider>
        <PageHeader>
          <PageTitle>
            <FormattedMessage {...messages.title} />
          </PageTitle>
        </PageHeader>
        <Table></Table>
      </ThemeProvider>
    </ProviderInterface>
  )
}

export default Interface
