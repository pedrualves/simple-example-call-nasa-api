const express = require('express'),
  app = express(),
  https = require('https')

app.get('/', (req, res) => {

  new Promise((resolve, reject) => {

    const dateParam = () => {
      const date = new Date(),
        d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      return `start_date=${d}&end_date=${d}`
    }

    let apiKeyParam = '&api_key=m8YEdkboUavrg8YQk6EMMJZa6n0g3oksRYpN6emO',
      endPoint = `https://api.nasa.gov/neo/rest/v1/feed?${dateParam()}${apiKeyParam}`

    https.get(endPoint, (res, err) => {
      if (err)
        reject(e)

      let body = '';

      res.on('data', (d) => {
        body += d;
      })

      res.on('end', () => {
        resolve(JSON.parse(body).near_earth_objects)
      })
    }).on('error', (e) => {
      reject(e)
    });


  }).then((success) => {
    res.status(200).json(success)
  }).catch((error) => {
    res.status(500).json(error)
  })

})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
