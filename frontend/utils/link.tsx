import linkifyIt from 'linkify-it'
import tlds from 'tlds'

const linkify = linkifyIt()
linkify.tlds(tlds).tlds('onion', true)

export function isURL(text: string) {
  return linkify.test(text)
}

export function formatUrl(text: string) {
  const u = linkify.match(text)
  return u && u[0] && u[0].url || '#'
}