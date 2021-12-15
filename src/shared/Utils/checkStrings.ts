const checkWordForUppercase = (string: string) => {
  return !/[a-zäöüß]/.test(string) && /[A-ZÄÖÜß]/.test(string)
}

export const checkStringForUppercase = (string: string) => {
  return string.split(/[ -]/).map(part => checkWordForUppercase(part)).includes(true)
}

const checkWordForPunctuation = (string: string) => {
  return /^[!?,.]{3,}$/.test(string)
}

export const checkStringForPunctuation = (string: string) => {
  return string.split(/[ -]/).map(part => checkWordForPunctuation(part)).includes(true)
}

export const checkStringForEmoji = (string: string) => {
  return /([\uD800-\uDBFF][\uDC00-\uDFFF])/g.test(string)
}
