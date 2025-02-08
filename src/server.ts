import config from './config.ts/config'
import app from './app'

const server = app.listen(config.PORT)

;(() => {
    try {
        console.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        console.error(`APPLICATION_ERROR`, { meta: err })

        server.close((error) => {
            if (error) {
                console.error(`APPLICATION_ERROR`, { meta: error })
            }
            process.exit(1)
        })
    }
})()
