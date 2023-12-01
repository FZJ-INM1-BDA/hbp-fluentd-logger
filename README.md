> archived
>
> Please use LogRotate and a in_tail input, rather than in_http

# HBP FluentD Logger

A thin wrapper for repeated HTTP(S) calls. Stand in replacement for all `console.log` etc calls to a central logging service. 

Written for HTTP(S) interface with [fluentd](https://github.com/fluent/fluentd)

## Example usage

```js
// server.js
const { Logger } = require('hbp-fluentd-logger')

const {
  APPLICATION_NAME,
  FLUENT_PROTOCOL,
  FLUENT_HOST,
  FLUENT_PORT
} = process.env

const name = APPLICATION_NAME || 'my application name'
const protocol = FLUENT_PROTOCOL || 'https'
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
    process.stderr.write(resp.toString())
    process.stderr.write('\n')
  }
}

const emitInfo = message => log.emit('info', { message }, handleRequestCallback)

const emitWarn = message => log.emit('warn', { message }, handleRequestCallback)

const emitError = message => log.emit('error', { message }, handleRequestCallback)

console.log('starting fluentd logging')

console.log = function () {
  emitInfo([...arguments])
}
console.warn = function () {
  emitWarn([...arguments])
}
console.error = function () {
  emitError([...arguments])
}
```

## License

MIT
