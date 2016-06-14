import consentMD from './text/consent.md'
import aspects from './aspects.json'
import _ from 'lodash'
import Triple from './triple'

const start = [{
  type: 'URLParams',
  simulate: {
    workerID: 'worker' + Date.now()
  }
}, {
  type: 'Shuffle',
  bucket: 'a',
  n: 15,
  aspects,
  seed: false
}, {
  type: 'Bernoulli',
  p: 0,
  variable: 'policy_aspects'
}]

const end = [{
  type: 'Message',
  body: `
Thank you for your interest in our survey.

  If you have comments or questions about the survey or how the survey can be used, please [share them with us](mailto:Kristen.Cooper@gordon.edu).
`
}]

const screens = start
  .concat(_.range(4)
    .map((i) => Triple('a', i * 3))
    .reduce((a, b) => a.concat(b))
  ).concat(end)

const table = {
  surveyAuthor : 'R.S. - BCHK',
  surveyName : 'demo',
  surveyVersion : '1.0.0',
  firebase: 'https://bchk.firebaseio.com'
}

export default {
  screens,
  table
}
