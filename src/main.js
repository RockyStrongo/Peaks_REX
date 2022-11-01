import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.scss'

//router library configured in /router/index.js
import router from './router'

// mitt library used for Event Bus 
import mitt from 'mitt'

const emitter = mitt();

//Apollo librairy for connection to graphQL Api
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

    // HTTP connection to the API
    const httpLink = createHttpLink({
        // console : https://peaksrex-dev.herokuapp.com/console
        uri: 'https://peaksrex-dev.herokuapp.com/v1/graphql',
    })
    
    // Cache implementation
    const cache = new InMemoryCache()
    
    // Create the apollo client
    const apolloClient = new ApolloClient({
        link: httpLink,
        cache,
    })
    
    const apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    })


const app = createApp(App)

app.use(router)

app.config.globalProperties.emitter = emitter;

app.use(apolloProvider)

app.mount('#app');