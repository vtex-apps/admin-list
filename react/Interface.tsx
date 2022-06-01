import React from 'react'
import {
  createSystem,
  PageHeader,
  PageTitle,
  
} from '@vtex/admin-ui'
import { FormattedMessage } from 'react-intl'
import { messages } from './utils/definedMessages'
import ChooseTableArea from './components/ChooseTable'
import ProviderLists from './provider/providerLists'
import ProviderUser from './provider/providerUser'
import ProviderInterface from './provider/providerInterface'


const [ThemeProvider] = createSystem({
  key: 'admin-ui-example',
})

function Interface() {
    return (
    <ProviderInterface>
      <ProviderLists>
        <ProviderUser>
          <ThemeProvider>
            <PageHeader>
              <PageTitle>
                <FormattedMessage {...messages.title} />
              </PageTitle>
            </PageHeader>
            <ChooseTableArea />
          </ThemeProvider>
        </ProviderUser>
      </ProviderLists>
    </ProviderInterface>
  )
}

export default Interface
