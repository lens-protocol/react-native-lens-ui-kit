export function configureIPFSURL(url) {
  if (url.startsWith('ipfs://')) {
    let result = url.substring(7, url.length)
    let modifiedUrl = `https://lens.infura-ipfs.io/ipfs/${result}`
    return modifiedUrl
  } else if (url.startsWith('https://')) {
      return url
    } else {
    return null
  }
}

export function returnIPFSPathorURL(url) {
  if (url.startsWith('ipfs://')) {
    let result = url.substring(7, url.length)
    let modifiedUrl = `https://lens.infura-ipfs.io/ipfs/${result}`
    return modifiedUrl
  } else {
    return url
  }
}