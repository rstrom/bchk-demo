export default (bucket, i) => {
  const aspects = [{
      text: `$text_${bucket}${i}`,
      color: `$color_${bucket}${i}`,
      rating: `$rating_${bucket}${i}`,
      code: `${bucket}${i}`
    }, {
      text: `$text_${bucket}${i + 1}`,
      color: `$color_${bucket}${i + 1}`,
      rating: `$rating_${bucket}${i + 1}`,
      code: `${bucket}${i + 1}`
    }, {
      text: `$text_${bucket}${i + 2}`,
      color: `$color_${bucket}${i + 2}`,
      rating: `$rating_${bucket}${i + 2}`,
      code: `${bucket}${i + 2}`
    }]

  return [{
    type: 'Bernoulli',
    p: 0.5,
    variable: 'coin'
  }, {
    type: 'Rating',
    instructions: [
      require('./text/policy_rating_instruct.md'),
      require('./text/personal_rating_instruct.md')
    ],
    aspect: aspects[0]
  }, {
    type: 'Rating',
    instructions: [
      require('./text/policy_rating_instruct.md'),
      require('./text/personal_rating_instruct.md')
    ],
    aspect: aspects[1]
  }, {
    type: 'Rating',
    instructions: [
      require('./text/policy_rating_instruct.md'),
      require('./text/personal_rating_instruct.md')
    ],
    aspect: aspects[2]
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[0], aspects[1], aspects[2]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[0], aspects[2], aspects[1]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[1], aspects[0], aspects[2]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[1], aspects[2], aspects[0]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[2], aspects[0], aspects[1]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }, {
    type: 'Tradeoff',
    text_instruct: [
      require('./text/policy_tradeoff_instruct.md'),
      require('./text/personal_tradeoff_instruct.md')
    ],
    text_instruct_conditions: ['$policy_aspects', true],
    aspects: [aspects[2], aspects[1], aspects[0]],
    triple_code: i / 3,
    should_decrease: '$coin'
  }]
}
