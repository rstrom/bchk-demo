import React from 'react'
import Radium from 'radium'
import ZoomBar from './ZoomBar'
import Format from '../services/format'

@Radium
class Aspect extends React.Component {
  static defaultProps = {
    text: 'Aspect text',
    rating: 20,
    delta: 4,
    deltaText: '',
    color: '#f77'
  }

  render () {
    const {
      text,
      rating,
      delta,
      deltaText,
      color,
      modStyle
    } = this.props

    return (
      <div style={[styles.main, modStyle]}>
        <div style={[styles.blurb]}>
          <span style={[styles.rating]}>
            {Number(rating) + Number(delta)}
          </span>
          {
            delta !== 0 && <p style={[styles.text]}>
              {Format.capitalize(text)}
              <span style={[styles.deltaText]}>
                {` ${deltaText} `}
              </span>
              <span style={[styles.delta]}>
              {
                delta > 0 ?
                '+' + String(delta) :
                String(delta)
              }
              </span>
            </p>
          }
          {
            delta === 0 && <p style={[styles.text]}>
              {Format.capitalize(text)}
              <span style={[styles.deltaText]}>
                {` ${deltaText} `}
              </span>
            </p>
          }
        </div>
        <ZoomBar
          position={rating}
          color={color}
          delta={delta}
        />
      </div>
    )
  }
}

const styles = {
  main: {
    boxSizing: 'border-box'
  },
  blurb: {
    marginBottom: 15
  },
  text: {
    fontSize: '1.25rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  rating: {
    float: 'right',
    paddingTop: 2,
    paddingRight: 5,
    paddingBottom: 15,
    paddingLeft: 15,
    fontWeight: 'bold'
  },
  deltaText: {
    fontWeight: 'normal'
  },
  delta: {
    color: '#fff',
    fontStyle: 'normal',
    paddingTop: 3,
    paddingRight: 5,
    paddingBottom: 3,
    paddingLeft: 5,
    background: '#000',
    borderRadius: 30
  }
}

export default Aspect
