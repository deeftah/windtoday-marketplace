import React, {createClass} from 'react'
import classnames from 'classnames'

import connectorResults from './connector'
import Footer from '../Footer'
import Spinner from '../Spinner'
import Overlay from '../Overlay'
import NoHits from '../NoHits'
import Hits from '../Hits'

import './style.scss'

const Results = createClass({

  getInitialState () {
    return {loading: true, ready: false}
  },

  renderResults (props, hasResults) {
    const {get} = props
    const theme = 'Results w-100 fl bg-white vh-100 overflow-x-hidden overflow-y-scroll'

    const style = classnames(theme, {
      'Results__expand': get('asideLeftOpen')
    })

    const hasAsideOpen = get('asideRightOpen') || get('asideLeftOpen')
    const isMobile = get('isMobile')

    return (
      <section data-app='results' className={style}>
        {isMobile && <Overlay active={hasAsideOpen} />}
        {hasResults ? <Hits {...props} /> : <NoHits {...props} />}
        <Footer />
      </section>
    )
  },

  componentWillReceiveProps () {
    const {props, state} = this
    const {searching} = props
    const {ready} = state

    if (searching && !ready) this.setState({loading: false, ready: true})
  },

  renderLoader (props) {
    return (
      <article className='z-max fixed vh-100 dt w-100 bg-blue'>
        <div className='dtc v-mid tc'>
          <Spinner />
        </div>
      </article>
    )
  },

  render () {
    const {props: parentProps, renderLoader, renderResults, state} = this
    const {searching, hasResults, query, hasMore, toggle, get, refine, hits} = parentProps
    const props = { searching, toggle, get, hasMore, refine, hits, query }
    const {loading} = state
    const render = loading ? renderLoader : renderResults
    return render(props, hasResults)
  }
})

export default connectorResults(Results)
