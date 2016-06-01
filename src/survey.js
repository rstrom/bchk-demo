import consentMD from './text/consent.md'
import aspects from './aspects.json'
import _ from 'lodash'
import Triple from './triple'
import demoA from './demographics/a'
import demoB from './demographics/b'

const start = [{
  type: 'URLParams',
  simulate: {
    workerID: 'worker' + Date.now()
  }
}, {
  type: 'Headers'
}, {
  type: 'Shuffle',
  bucket: 'a',
  n: 15,
  aspects
}, {
  type: 'Preamble',
  personal_aspects: [{
    text: 'your health',
    color: '#afa',
    code: 'p0'
  }, {
    text: 'your financial security',
    color: '#ffa',
    code: 'p1'
  }],
  policy_aspects: [{
    text: 'the amount of freedom in society',
    color: '#afa',
    code: 'p2'
  }, {
    text: 'people not feeling anxious',
    color: '#ffa',
    code: 'p3'
  }],
  intro_text: require('./text/preamble_intro.md'),
  personal_rating_text_i: require('./text/preamble_personal_rating_i.md'),
  personal_rating_text_ii: require('./text/preamble_personal_rating_ii.md'),
  policy_rating_text_i: require('./text/preamble_policy_rating_i.md'),
  policy_rating_text_ii: require('./text/preamble_policy_rating_ii.md'),
  rating_response_text: require('./text/preamble_rating_response.md'),
  personal_rating_instruct: require('./text/personal_rating_instruct.md'),
  policy_rating_instruct: require('./text/policy_rating_instruct.md'),
  personal_tradeoff_text: require('./text/preamble_personal_tradeoff.md'),
  policy_tradeoff_text: require('./text/preamble_policy_tradeoff.md'),
  personal_tradeoff_instruct: require('./text/personal_tradeoff_instruct.md'),
  policy_tradeoff_instruct: require('./text/policy_tradeoff_instruct.md'),
  tradeoff_personal_edge_text: 'There is no practice personal decision about the two aspects you just rated since your ratings were beyond extreme.',
  tradeoff_policy_edge_text: 'There is no practice policy decision about the two aspects you just rated since your ratings were beyond extreme.',
  understand_text: require('./text/preamble_understand.md')
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
