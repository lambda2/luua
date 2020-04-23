import { fromPairs, map } from "lodash";

type ErrorMessage = [string, string[]]

export interface BackendError {
  error: boolean
  messages: ErrorMessage[]
  errors?: {[key: string]: string[]}
  message?: string | string[]
}

export const errorsFromResponse = ({ data }: { data: BackendError }) => {
  if (data.errors) {
    return fromPairs([
      ...map(data.errors, (v: string[], k: string) => [k, v.join(',')]),
      ...map(data.errors, (v: string[], k: string) => [`${k.replace(/\.[\w_]+/, '_attributes')}`, v.join(',')])
    ])
  }
  else if (data.messages) {
    return fromPairs(data.messages.map(([a, b]: any) => [a, b.join(',')]))
  } else {
    return { globalErrors: data.message || 'An error occured' }
  }
}