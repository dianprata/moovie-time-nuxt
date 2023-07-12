import LANGUAGES from '~/constants/languages'
import type { MediaType } from '~/types'

export function formatDate(string: string) {
  return new Date(string).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getTitle(type: MediaType) {
  switch (type) {
    case 'movie': return 'Movies'
    case 'tv': return 'TV Shows'
    default : return 'Movies'
  }
}

export function formatLang(iso: string) {
  const fullLang = LANGUAGES.find(lang => lang.iso_639_1 === iso)

  if (fullLang)
    return fullLang.english_name

  return iso
}

export const formatToDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
