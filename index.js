const express = require("express")
const app = express()

app.use(express.static('dist'))

let server = app.listen( 7357, () => {
    console.log('Press CTRL-C to stop\n')
})