export default [
  {
    type: 'PreIntro',
    text: require('./text/preamble_intro.md'),
    next: 'Next'
  },
  {
    type: 'PreRating',
    text: require('./text/preamble_personal_rating_i.md'),
    instruct: require('./text/personal_rating_instruct.md'),
    aspect: {
      text: 'your health',
      color: '#afa',
      code: 'p0'
    }
  },
  {
    type: 'PreRating',
    text: require('./text/preamble_personal_rating_ii.md'),
    instruct: require('./text/personal_rating_instruct.md'),
    aspect: {
      text: 'your financial security',
      color: '#ffa',
      code: 'p1'
    }
  },
  {
    type: 'PreTradeoff',
    text: require('./text/preamble_personal_tradeoff.md'),
    instruct: require('./text/personal_tradeoff_instruct.md'),
    edgeCaseText: 'There is no practice personal decision about the two aspects you just rated since your ratings were beyond extreme.',
    tradeoff: Math.random() > .5 ? [[4], [5]] : [[5], [4]],
    aspects: [
      {
        text: 'your health',
        color: '#afa',
        code: 'p0',
        rating: '$rating_p0'
      },
      {
        text: 'your financial security',
        color: '#ffa',
        code: 'p1',
        rating: '$rating_p1'
      }
    ]
  },
  {
    type: 'PreUnderstand',
    text: require('./text/preamble_understand.md'),
    again: 'View Instructions Again',
    ok: 'OK'
  }
]

const old = {
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
    text: 'people not feeling anxious',
    color: '#afa',
    code: 'p2'
  }, {
    text: 'the amount of freedom in society',
    color: '#ffa',
    code: 'p3'
  }],
  intro_text: require('./text/preamble_intro.md'),
  policy_intro: require('./text/policy_intro.md'),
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
}
