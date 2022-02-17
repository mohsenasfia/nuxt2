export default function (context) {
  // Add the userAgent property to the context
  console.log('middleware', context)
  context.app.data.test = "template"
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
