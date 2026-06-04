import { useWsStore } from './stores/wsStore'

export const ws = new WebSocket('ws://localhost:7878')

ws.onopen = () => {
    console.log('Connected to server')
}

ws.onmessage = (event) => {
    const wsStore = useWsStore()
    const message = JSON.parse(event.data)
    wsStore.latestTransaction = message
    console.log('Message from server:', message)
}

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        ws.close()
    })
}
