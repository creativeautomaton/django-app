import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 arrayOf, func, bool, string, number, shape,
} from 'prop-types'

import { DotLoader } from 'react-spinners'
import Typography from '@material-ui/core/Typography'
import {
 openCopyLinkModal,
 closeCopyLinkModal,
 openCountryModal,
 closeCountryModal,
 openNotAuthModal,
 closeNotAuthModal,
} from '../actions/modalActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CopyLinkModal from '../modules/views/CopyLinkModal'
import CountryModal from '../modules/views/CountryModal'
import NotAuthModal from '../modules/views/NotAuthModal'
import TripReportTruncated from '../modules/views/TripReportTruncated'
import ProductCategories from '../modules/views/ProductCategories';
import ProductSmokingHero from '../modules/views/ProductSmokingHero';
import AppFooter from '../modules/views/AppFooter';
import ProductHero from '../modules/views/ProductHero';
import ProductValues from '../modules/views/ProductValues';
import ProductHowItWorks from '../modules/views/ProductHowItWorks';
import ProductCTA from '../modules/views/ProductCTA';
import AppAppBar from '../modules/views/AppAppBar';


export function Home(props) {
  const { tripReport, modalCountry } = props

  const handleClick = (e) => {
    e.preventDefault()
    props.toggleFavorite(e.currentTarget.id)
  }

  const featuredTripReport = tripReport && tripReport.map((report) => (
    <div key={report.id} style={{ marginBottom: 20 }}>
      <TripReportTruncated handleClick={handleClick} {...report} {...props} />
    </div>
  ))

  return (
    <div>
      <NotAuthModal {...props} />
      <CopyLinkModal {...props} />
      {modalCountry && <CountryModal {...props} />}

      <React.Fragment>
        <ProductHero />
        <ProductValues />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <ProductSmokingHero />
      </React.Fragment>
    </div>
  )
}
// <div style={{ marginTop: 60, textAlign: 'center' }}>
//   <h2>Search for Countries and Territories</h2>
//   <img style={{ margin: '0 auto' }} src="https://raw.githubusercontent.com/peterzernia/wanderlist/master/images/country.png" alt="" />
// </div>
// <div style={{ marginTop: 60, textAlign: 'center' }}>
//   <h2>Add them to your personalized map</h2>
//   <img style={{ margin: '0 auto' }} src="https://raw.githubusercontent.com/peterzernia/wanderlist/master/images/map.png" alt="" />
// </div>
// <div className="content" style={{ margin: '0 auto', marginTop: 30 }}>
//   <h2>Post Trip Reports about journeys you&#39;ve taken</h2>
//   <div style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}>
//     Featured Trip Report
//   </div>
//   {
//     featuredTripReport
//     ? <div>{featuredTripReport}</div>
//     : <DotLoader size={50} color="#2196f3" className="content" />
//   }
// </div>

const mapState = (state) => ({
    tripReport: state.tripReport.featuredTripReport,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    toggleFavorite,
    openCountryModal,
    closeCountryModal,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Home)

Home.propTypes = {
  tripReport: arrayOf(shape({})),
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  pk: number,
  authenticated: bool.isRequired,
  showNotAuthModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
  toggleFavorite: func.isRequired,
}

Home.defaultProps = {
  modalLink: '',
  pk: null,
  tripReport: null,
}
