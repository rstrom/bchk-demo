import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import { declare, type } from 'packs'
import Button from '../global/components/SimpleButton'
import Markdown from 'react-remarkable'
import Format from '../global/services/format'
import Rating from '../Rating'
import Tradeoff from '../Tradeoff'

const Container = Radium(({ children }) => (
  <div style={[styles.container]}>
  {
    children
  }
  </div>
))

let Intro = Radium(({ text, next, push }) => (
  <Container>
    <Markdown
      source={text}
    />
    <div style={[styles.row, styles.buttons]}>
      <Button
        text={next}
        handler={() => push({})}
      />
    </div>
  </Container>
))

Intro.propTypes = {
  text: declare(type.string),
  next: declare(type.string)
}

const BinaryScreen = Radium(({ children, first }) => (
  <div style={[styles.screen]}>
  {
    first && children[0] || children[1]
  }
  </div>
))

let RatingPractice = Radium(({ text, instruct, aspect, push }) => (
  <Container>
    <Markdown
      source={text}
    />
    <div style={[styles.screen]}>
      <Rating
        aspect={aspect}
        push={push}
        instructions={[instruct]}
        instruct_conditions={[true, false]}
        key={aspect.text}
      />
    </div>
  </Container>
))

RatingPractice.propTypes = {
  text: declare(type.string),
  instruct: declare(type.string),
  aspect: declare(
    type.Object({
      text: type.string,
      color: type.string,
      code: type.string
    })
  )
}

let TradeoffPractice = Radium(({ text, instruct, edgeCaseText, aspects, tradeoff, push }) => {
  const edge = (aspects[0].rating < 8 && aspects[1].rating > 92) ||
    (aspects[1].rating < 8 && aspects[0].rating > 92)

  return (
    <Container>
      <Markdown
        source={
          text
            .replace(/\[aspect1\]/g, Format.capitalize(aspects[0].text))
            .replace(/\[tradeoff1\]/g, tradeoff[0][0])
            .replace(/\[aspect2\]/g, Format.capitalize(aspects[1].text))
            .replace(/\[tradeoff2\]/g, tradeoff[1][0])
        }
      />
      <BinaryScreen first={edge}>
        <div>
          <Markdown
            source={edgeCaseText}
          />
          <Button
            text={'Continue'}
            handler={() => push({})}
          />
        </div>
        <Tradeoff
          tradeoff_range_left={tradeoff[0]}
          tradeoff_range_right={tradeoff[1]}
          text_instruct={[instruct]}
          aspects={aspects}
          push={push}
        />
      </BinaryScreen>
    </Container>
  )
})

TradeoffPractice.propTypes = {
  text: declare(type.string),
  instruct: declare(type.string),
  edgeCaseText: declare(type.string),
  tradeoff: declare(type.Array(type.number)),
  aspects: declare(
    type.Array(
      type.Object({
        text: type.string,
        color: type.string,
        code: type.string
      })
    )
  )
}

let Understand = ({ text, again, ok, push, reinsert }) => (
  <Container>
    <Markdown
      source={text}
    />
    <div style={[styles.row, styles.buttons]}>
      <Button
        text={again}
        handler={() => {
          history.go(-8)
        }}
      />
      <Button
        modStyle={{marginLeft: '1rem' }}
        text={ok}
        handler={() => push({})}
      />
    </div>
  </Container>
)

Understand.propTypes = {
  text: declare(type.string),
  again: declare(type.string),
  ok: declare(type.string)
}

@Radium
class Consent extends React.Component {
  static propTypes = {
    personal_aspects: declare(type.Array(type.string)),
    policy_aspects: declare(type.Array(type.string)),
    intro_text: declare(type.string),
    personal_rating_text: declare(type.string),
    understand_text: declare(type.string),
    continue: declare(type.string),
    again: declare(type.string)
  }

  static defaultProps = {
    continue: 'Next',
    again: 'View Instructions Again'
  }

  static simulate (props) {
    return {
      practice: 'simulated'
    }
  }

  constructor (props) {
    super(props)
    this.state = { step: 0, table: {} }
  }

  push (data) {
    window.scrollTo(0, 0)
    const edge = _.includes(data, 'edge')
    console.log(data, edge)
    this.setState({
      table: {
        ...this.state.table,
        ...data
      },
      step: edge ? this.state.step : this.state.step + 1
    })
  }

  render () {
    const { step, table } = this.state
    const { personal_aspects, policy_aspects } = this.props
    const personal_tradeoff = Math.random() > .5 ? [[4], [5]] : [[5], [4]]
    const policy_tradeoff = Math.random() > .5 ? [[4], [5]] : [[5], [4]]

    const screens = [
      <Intro text={this.props.intro_text} />,
      <RatingPractice
        text={
          this.props.personal_rating_text_i
            .replace(/\[aspect1\]/g, Format.capitalize(personal_aspects[0].text))
            .replace(/\[rating1\]/g, personal_aspects[0].rating)
        }
        responseText={this.props.rating_response_text}
        instruct={this.props.personal_rating_instruct}
        aspect={personal_aspects[0]}
        table={table}
        push={::this.push}
      />,
      <RatingPractice
        text={this.props.personal_rating_text_ii}
        responseText={this.props.rating_response_text}
        instruct={this.props.personal_rating_instruct}
        aspect={personal_aspects[1]}
        table={table}
        push={::this.push}
      />,
      <TradeoffPractice
        text={this.props.personal_tradeoff_text}
        edgeCaseText={this.props.tradeoff_personal_edge_text}
        instruct={this.props.personal_tradeoff_instruct}
        table={table}
        push={::this.push}
        aspects={personal_aspects}
        tradeoff={personal_tradeoff}
      />,
      <Intro text={this.props.policy_intro} />,
      <RatingPractice
        text={
          this.props.policy_rating_text_i
            .replace(/\[aspect1\]/g, Format.capitalize(policy_aspects[0].text))
            .replace(/\[rating1\]/g, policy_aspects[0].rating)
        }
        responseText={this.props.rating_response_text}
        instruct={this.props.policy_rating_instruct}
        aspect={policy_aspects[0]}
        table={table}
        push={::this.push}
      />,
      <RatingPractice
        text={this.props.policy_rating_text_ii}
        responseText={this.props.rating_response_text}
        instruct={this.props.policy_rating_instruct}
        aspect={policy_aspects[1]}
        table={table}
        push={::this.push}
      />,
      <TradeoffPractice
        text={this.props.policy_tradeoff_text}
        edgeCaseText={this.props.tradeoff_policy_edge_text}
        instruct={this.props.policy_tradeoff_instruct}
        table={table}
        push={::this.push}
        aspects={policy_aspects}
        tradeoff={policy_tradeoff}
      />,
      <Understand text={this.props.understand_text} />
    ]

    return (
      <div style={[styles.container]}>
        {
          screens[step]
        }
        {
          step === screens.length -1  && (
            <div style={[styles.row, styles.buttons]}>
              <Button
                text={this.props.again}
                handler={() => {
                  this.setState({ step: 0, table: {} })
                }}
              />
              <Button
                modStyle={{marginLeft: '1rem' }}
                text={'OK'}
                handler={() => {
                  this.props.push(
                    _(table)
                      .map((v, k) => [`practice_${k}`, v])
                      .object()
                      .value()
                  )
                }}
              />
            </div>
          )
        }
        {
          (step === 0 || step === 4) &&
          <div style={[styles.row, styles.buttons]}>
            <Button
              text={this.props.continue}
              handler={() => {
                window.scrollTo(0, 0)
                this.setState({ step: step + 1 })
              }}
            />
          </div>
        }
      </div>
    )
  }
}

import gstyles from '../global/styles'
const styles = {
  ...gstyles,
  container: {
    fontSize: '1rem',
    boxSizing: 'border-box',
    width: '100%',
    borderRadius: 15,
    boxShadow: '2px 2px 4px #ddd',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 60,
    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',
    background: '#fff'
  },
  screen: {
    background: '#ddd',
    border: '0.25rem solid #000',
    ...gstyles.padding(2),
    ...gstyles.margin(1, 0, 2, 0)
  },
  option: {
    flexGrow: 1,
    flexBasis: 0,
    msFlex: '1 0'
  },
  buttons: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  center: {
    textAlign: 'center'
  },
  circle: {
    cursor: 'pointer'
  }
}

export default {
  Intro,
  RatingPractice,
  TradeoffPractice,
  Understand
}
