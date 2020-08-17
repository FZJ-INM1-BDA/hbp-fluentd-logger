const { Logger } = require('./index')

const {
  APPLICATION_NAME,
  FLUENT_PROTOCOL,
  FLUENT_HOST,
  FLUENT_PORT
} = process.env

const name = APPLICATION_NAME || 'my application name'
const protocol = FLUENT_PROTOCOL || 'http'
const host = FLUENT_HOST || 'localhost'
const port = FLUENT_PORT || 24224

const log = new Logger(name, {
  protocol,
  host,
  port
})

const handleRequestCallback = (err, resp, body) => {
  if (err) {
    process.stderr.write(`fluentD logging failed\n`)
    process.stderr.write(err.toString())
    process.stderr.write('\n')
  }

  if (resp && resp.statusCode >= 400) {
    process.stderr.write(`fluentD logging responded error\n`)
    console.log(JSON.stringify(resp))
    process.stderr.write(resp.toString())
    process.stderr.write('\n')
  }
}

log.emit('info', [{ hello: 'world', foo: 'bar' }, 123], handleRequestCallback)
