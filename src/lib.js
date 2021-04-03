/**
 * We host here general purpose code that doesn't find
 * its place anywhere else.
 */

// Get a Promise that resolves after a delay in milliseconds.
// from https://github.com/marmelab/react-admin
export const later = (delay = 100) =>
  new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })

// Get a Promise that resolves once a condition is satisfied.
// from https://github.com/marmelab/react-admin
export const waitFor = (condition) =>
  new Promise((resolve) =>
    condition()
      ? resolve()
      : later().then(() => waitFor(condition).then(() => resolve()))
  )
