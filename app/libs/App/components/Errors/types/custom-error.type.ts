import type { NuxtError } from '#app'
import type { AxiosError } from 'axios'

export type CustomError = Omit<NuxtError, 'toJSON'>
  & Pick<AxiosError, 'name' | 'message' | 'request'>
  & {
    url?: string
    method?: string
  }
