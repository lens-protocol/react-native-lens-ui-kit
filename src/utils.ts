export function configureIPFSURL(url: string) {
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

export function returnIPFSPathorURL(url: string) {
  if (url.startsWith('ipfs://')) {
    let result = url.substring(7, url.length)
    let modifiedUrl = `https://lens.infura-ipfs.io/ipfs/${result}`
    return modifiedUrl
  } else {
    return url
  }
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};