import React, { useEffect, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  func, number, bool, shape, arrayOf, string,
} from 'prop-types'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { DotLoader } from 'react-spinners'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  openCountryModal,
  closeCountryModal,
  openEditProfileModal,
  closeEditProfileModal,
  openPostModal,
  closePostModal,
  openUpdatePostModal,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  openTripReportModal,
  closeTripReportModal,
  openCopyLinkModal,
  closeCopyLinkModal,
} from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import {
  fetchNextUserTripReports, postTripReport, deleteTripReport, updateTripReport,
} from '../actions/tripReportActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'
import OpenStreetMap from '../modules/views/OpenStreetMap'
import EditProfileModal from '../modules/views/EditProfileModal'
import TripReportThumbnail from '../modules/views/TripReportThumbnail'
import TripReportModal from '../modules/views/TripReportModal'
import ConfirmDeleteModal from '../modules/views/ConfirmDeleteModal'
import CountryModal from '../modules/views/CountryModal'
import CopyLinkModal from '../modules/views/CopyLinkModal'
import PostModal from '../modules/views/PostModal'
import PropTypes from 'prop-types';
import AdminDrawer from '../modules/views/AdminDrawer'

import CustomerSubscriptionForm from '../modules/views/CustomerSubscriptionForm'

//  Stripe Components
// import {StripeProvider, Elements} from 'react-stripe-elements';
// import CheckoutForm from '../modules/form/CheckoutForm'

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  DrawerContent:{
    flexGrow: 1, padding: 10, marginRight: -drawerWidth,
  }
});

const drawerWidth = 220;

export function Subscription(props) {

  const {
    next,
    fetchingUserNext,
    user,
    modalPost,
    userCountries,
    tripReports,
    location,
    fetched,
    posting,
    updating,
    fetchedTripReports,
  } = props

  // const {  classes } = props

  const isBottom = (el) => {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight
    return false
  }

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    const el = document.getElementById('scroll')
    if (isBottom(el) && next && !fetchingUserNext) {
      props.fetchNextUserTripReports(next)
    }
    // eslint-disable-next-line
  }, [props.fetchNextUserTripReports, fetchingUserNext, next])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /*
  This handle submit works with the edit Subscription modal.
  */
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e.target);
  //   // props.putUserSubscriptionData(
  //   //   e.target.username.value,
  //   //   e.target.email.value,
  //   //   e.target.product.value,
  //   //   'Your Subscription has been updated.',
  //   // )
  // }
  // <CustomerSubscriptionForm handleSubmit={handleSubmit} {...props} />


  const isEdit = location.pathname === '/Subscription'

  if (posting || updating) {
       return (
         <div>
           <DotLoader size={50} color="primary.dark" className="content" />
           <br />
         </div>
      )
 }

  return (

    <React.Fragment>
     <CssBaseline />
     <Container maxWidth="sm"  className="content" color="primary.dark" >
      <AdminDrawer />
      <main className="DrawerContent" >
        </main>
    </Container>
  </React.Fragment>

  )
}


const mapState = (state) => ({
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    user: state.user.user,
    next: state.tripReport.userTripReports.next,
    fetched: state.user.fetched,
    fetchingUserNext: state.tripReport.fetchingUserNext,
    searchedCountry: state.country.country,
    showEditProfileModal: state.modal.showEditProfileModal,
    modalProfile: state.modal.modalProfile,
    userCountries: state.user.user.countries,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showPostModal: state.modal.showPostModal,
    fetchedTripReports: state.tripReport.fetchedTripReports,
    tripReports: state.tripReport.userTripReports.results,
    updatePostModal: state.modal.updatePostModal,
    modalPost: state.modal.modalPost,
    showConfirmDeleteModal: state.modal.showConfirmDeleteModal,
    showTripReportModal: state.modal.showTripReportModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
    posting: state.tripReport.posting,
    updating: state.tripReport.updating,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    fetchCountry,
    putUserData,
    openEditProfileModal,
    closeEditProfileModal,
    openCountryModal,
    closeCountryModal,
    removeError,
    postTripReport,
    deleteTripReport,
    updateTripReport,
    openPostModal,
    closePostModal,
    openUpdatePostModal,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openTripReportModal,
    closeTripReportModal,
    fetchNextUserTripReports,
    toggleFavorite,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Subscription)

Subscription.propTypes = {
  pk: number,
  authenticated: bool.isRequired,
  user: shape({}).isRequired,
  next: string,
  fetched: bool.isRequired,
  fetchingUserNext: bool.isRequired,
  searchedCountry: arrayOf(shape({})).isRequired,
  showEditProfileModal: bool.isRequired,
  modalProfile: shape({}).isRequired,
  userCountries: arrayOf(shape({})).isRequired,
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  showPostModal: bool.isRequired,
  fetchedTripReports: bool.isRequired,
  tripReports: arrayOf(shape({})).isRequired,
  updatePostModal: bool.isRequired,
  modalPost: shape({}).isRequired,
  showConfirmDeleteModal: bool.isRequired,
  showTripReportModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  posting: bool.isRequired,
  updating: bool.isRequired,
  fetchCountry: func.isRequired,
  putUserData: func.isRequired,
  openEditProfileModal: func.isRequired,
  closeEditProfileModal: func.isRequired,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  removeError: func.isRequired,
  postTripReport: func.isRequired,
  deleteTripReport: func.isRequired,
  updateTripReport: func.isRequired,
  openPostModal: func.isRequired,
  closePostModal: func.isRequired,
  openUpdatePostModal: func.isRequired,
  openConfirmDeleteModal: func.isRequired,
  closeConfirmDeleteModal: func.isRequired,
  openTripReportModal: func.isRequired,
  closeTripReportModal: func.isRequired,
  fetchNextUserTripReports: func.isRequired,
  toggleFavorite: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
  location: shape({}).isRequired,
}
// Subscription.propTypes = {
//   classes: PropTypes.object.isRequired
// }

Subscription.defaultProps = {
  modalLink: '',
  pk: null,
  next: '', 
}
