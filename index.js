const express = require("express")
const path = require("path")
const app = express()

app.use(express.static('dist'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

let server = app.listen( 7357, () => {
    console.log('Press CTRL-C to stop\n')
})