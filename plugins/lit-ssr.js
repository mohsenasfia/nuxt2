import '@lit-labs/ssr/lib/install-global-dom-shim.js'
import { Readable } from 'stream'
import { render } from '@lit-labs/ssr';
import { html } from 'lit'
import '../components/simple-button';
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

export default async ({ app }, inject) => {
  const buttonProps = {
    disabled: true,
  }
  const button = await renderComponentTemplate('simple-button', buttonProps)
  console.log(button)
  inject('hello', () => buttonProps)
}

const readStream = (stream, encoding = 'utf8') => {
  stream.setEncoding(encoding)
  return new Promise((resolve, reject) => {
    let data = ''
    stream.on('data', (chunk) => {
      data += chunk
    })
    stream.on('end', () => resolve(data))
    stream.on('error', (error) => reject(error))
  })
}

const replaceTemplateString = (template) => {
  return template;
}

const getProps = (props) => {
  let propsString = ''
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      propsString += ` ${key}="${value}"`
    }
  }
  return propsString
}

export const renderComponentTemplate = async (componentName, props) => {
  const templateString = `<${componentName}${getProps(
    props
  )}></${componentName}>`

  const template = html`${unsafeHTML(templateString)}`
  console.log('template: ',template)
  return replaceTemplateString(template)
}
