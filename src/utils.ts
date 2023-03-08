import {
  ExtendedProfile
} from './types'

export function configureIpfsUrl(uri: string, IPFSGateway: string) {
  if (uri.startsWith('ar://')) {
    let result = uri.substring(5, uri.length)
    let modifiedUrl = `https://arweave.net/${result}`
    return modifiedUrl
  } else if (uri.startsWith('ipfs://')) {
    let result = uri.substring(7, uri.length)
    let modifiedUrl = `${IPFSGateway}/${result}`
    return modifiedUrl
  } else if (uri.startsWith('https://')) {
      return uri
    } else {
    return null
  }
}

export function returnIpfsPathOrUrl(uri: string, IPFSGateway: string) {
  if (uri.startsWith('ar://')) {
    let result = uri.substring(5, uri.length)
    let modifiedUrl = `https://arweave.net/${result}`
    return modifiedUrl
  } else if (uri.startsWith('ipfs://')) {
    let result = uri.substring(7, uri.length)
    let modifiedUrl = `${IPFSGateway}/${result}`
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

export function formatProfilePictures(profiles: ExtendedProfile[], IPFSGateway:string) {
  return profiles.map(profile => {
    let { picture, coverPicture } = profile
    if (picture && picture.__typename === 'MediaSet') {
      if (picture.original && picture.original.url) {
        picture.original.url = returnIpfsPathOrUrl(picture.original.url, IPFSGateway)
      } else {
        profile.missingAvatar = true
      }
    }
    if (coverPicture && coverPicture.__typename === 'MediaSet') {
      if (coverPicture.original.url) {
        coverPicture.original.url = returnIpfsPathOrUrl(coverPicture.original.url, IPFSGateway)
      } else {
        profile.missingCover = true
      }
    }
    return profile
  })
}

export function filterMimeTypes(items: any[]) {
  items = items.filter(item => {
    if (item.__typename === 'Mirror') return true
    const { metadata: { media } } = item
    if (media.length) {
      if (media[0].original) {
        if (media[0].original.mimeType === 'image/jpeg') return true
        if (media[0].original.mimeType === 'image/gif') return true
        if (media[0].original.mimeType === 'image/png') return true
        return false
      }
    } else {
      return true
    }
  })
  return items
}

export function configureMirrorAndIpfsUrl(items: any[], IPFSGateway: string) {
  return items.map(item => {
    if (item.profileSet) return item
    let { profile } = item
    if (item.__typename === 'Mirror') {
      if (item.mirrorOf) {
        item.originalProfile = profile
        item.stats = item.mirrorOf.stats
        profile = item.mirrorOf.profile
      }
    }
    if (profile?.picture?.uri) {
      profile.picture.original = {
        url: profile.picture.uri
      }
    } else if (profile?.picture?.__typename === 'MediaSet' && profile.picture.original && profile.picture.original.url) {
      const url = configureIpfsUrl(profile.picture.original.url, IPFSGateway)
      if (url) {
        profile.picture.original.url = url
      } else {
        profile.missingAvatar = true
      }
    } else {
      profile.missingAvatar = true
    }

    item.profile = profile
    item.profileSet = true
    return item
  })
}