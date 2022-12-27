const fs = require('fs')
const randomizer = require('../randomizer')

module.exports = (http) => {

    let robotsTxt = fs.readFileSync(__dirname + '/files/robots.txt', {encoding: 'utf-8'});
    robotsTxt = randomizer.replace(robotsTxt)

    http.get('/robots.txt', (req,res) => {
        let content = robotsTxt;
        res.set('Content-Type', 'text/plain')
        res.send(content);
    })

    http.get('/bak*', (req,res) => {
        //if accessed, this request is malicious
        console.log('Simulation: --- Trap hit, marking the session as malicious', req.session)
        req.session.isMalicious = true
        res.status(500).send("Internal Server Error")
    })
}