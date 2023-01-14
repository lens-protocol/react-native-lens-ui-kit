import {
  ExtendedProfile
} from './types'

export function configureIPFSURL(uri: string) {
  if (uri.startsWith('ipfs://')) {
    let result = uri.substring(7, uri.length)
    let modifiedUrl = `https://lens.infura-ipfs.io/ipfs/${result}`
    return modifiedUrl
  } else if (uri.startsWith('https://')) {
      return uri
    } else {
    return null
  }
}

export function returnIPFSPathorURL(uri: string) {
  if (uri.startsWith('ipfs://')) {
    let result = uri.substring(7, uri.length)
    let modifiedUrl = `https://lens.infura-ipfs.io/ipfs/${result}`
    return modifiedUrl
  } else {
    return uri
  }
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function formatProfilePictures(profiles: ExtendedProfile[]) {
  profiles = profiles.map(profile => {
    let { picture, coverPicture } = profile
    if (picture && picture.__typename === 'MediaSet') {
      if (picture.original) {
        picture.original.url = returnIPFSPathorURL(picture.original.url)
      } else {
        profile.missingAvatar = true
      }
    }
    if (coverPicture && coverPicture.__typename === 'MediaSet') {
      if (coverPicture.original.url) {
        coverPicture.original.url = returnIPFSPathorURL(coverPicture.original.url)
      } else {
        profile.missingCover = true
      }
    }
    return profile
  })
  return profiles
}