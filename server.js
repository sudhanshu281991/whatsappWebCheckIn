const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const morgan  = require('morgan')
const compression = require('compression')
const microcache = require('route-cache')
const bodyParser = require('body-parser')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const opn = require('opn')
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const request = require('request')
const routes = require('./server/routes')
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./yatra_asi'),
    // recommended for performance
    runInNewContext: false
  }))
}

let renderer
let readyPromise
var templatePath = resolve('./src/index.template.html')
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./yatra_asi/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./yatra_asi/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use('/yatra_asi', serve('./yatra_asi', true))
app.use('/public', serve('./public', true))
app.use('/manifest.json', serve('./manifest.json', true))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/asi',routes)
app.use(bodyParser.json())

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))

function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'ASI Monuments', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}


app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

app.post('/newMessages', function (req, res) {
  var data = req.body;
  console.log(data)
  if(!data.messages[0].fromMe){
       var url = 'https://eu1.whatsapp.chat-api.com/instance889/message?token=kho9m25qwhvygj66';
        var data = {
          phone: data.messages[0].chatId.split('@')[0], // Receivers phone
          body: 'Your Seat has been booked', // Сообщение
      };
      // Send a request
      request({
          url: url,
          method: "POST",
          json: data
      });//Response does not matter
  }
   
  res.send('Hello')
});

app.post('/api/sendWhatsAppWebCheckinNotification', function (req, res) {
  let t = fs.readFileSync('userProf.json', 'utf8')
  let seatInfo = fs.readFileSync('seatFJson.json', 'utf8')
  t= t=="" ? {} :JSON.parse(t)
  seatInfo= t=="" ? {} :JSON.parse(seatInfo)
  for(var i=0;i< 5;i++){
    var url = 'https://eu1.whatsapp.chat-api.com/instance889/message?token=kho9m25qwhvygj66';
    var data = {
      phone: t.passengerInfo[i].mob, // Receivers phone
      body: `Hi ${t.passengerInfo[i].name},\nSeats are filling fast for your booked flight ${seatInfo.data.vendor} ${t.passengerInfo[i].flightNo} from ${seatInfo.data.originCity} to ${seatInfo.data.destinationCity} at ${seatInfo.data.timings}.\n\nPlease provide your preferred flight no eg:1C,2B\n\n\n😢 - Unavailable\n😊 -  Available Free Seats\n\n   *Available Paid Seats*:\n🤗 - 3XL Seats @ ₹ 600\n🤑 - 6 Paid Seats @ ₹ 300\n😎 - 14 Paid Seats @ ₹ 200\n\n   *PLANE'S FRONT*\n`, // Сообщение
  };
  request({
      url: url,
      method: "POST",
      json: data
  });//Response does not matter
  }
  res.send('Hello')
});



const port = process.env.PORT || 8282
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
