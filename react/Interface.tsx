import React from 'react'
import { createSystem } from '@vtex/admin-ui'
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
            <ChooseTableArea />
          </ThemeProvider>
        </ProviderUser>
      </ProviderLists>
    </ProviderInterface>
  )
}

export default Interface
