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
  openEditProfileModal,
  closeEditProfileModal,
  openPostModal,
  closePostModal,
  openUpdatePostModal,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  openCopyLinkModal,
  closeCopyLinkModal,
} from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'
import OpenStreetMap from '../modules/views/OpenStreetMap'
import EditDashboardModal from '../modules/views/EditProfileModal'
import ConfirmDeleteModal from '../modules/views/ConfirmDeleteModal'
import CopyLinkModal from '../modules/views/CopyLinkModal'
import PostModal from '../modules/views/PostModal'
import AdminDrawer from '../modules/views/AdminDrawer'

import Budget from '../modules/views/Budget'
import TotalUsers from '../modules/views/TotalUsers'
import TasksProgress from '../modules/views/TasksProgress'
import TotalProfit from '../modules/views/TotalProfit'
// import LatestSales from '../modules/views/LatestSales'
// import UsersByDevice from '../modules/views/UsersByDevice'
// import LatestProducts from '../modules/views/LatestProducts'
// import LatestOrders from '../modules/views/LatestOrders'

const drawerWidth = 220;

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

export function Dashboard(props) {
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

  const isBottom = (el) => {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight
    return false
  }


  /*
  This handle submit works with the edit Dashboard modal.
  */
  const handlePostSubmit = (e) => {
    e.preventDefault()
    // e.target.countries.value must be split at the comma and then strings
    // must be converted into numbers.

    props.closePostModal()
  }
  const handleUpdateSubmit = (e) => {
    e.preventDefault()

    props.closePostModal()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.putUserData(
      e.target.username.value,
      e.target.email.value,
      Number(e.target.country.value),
      e.target.biography.value,
      'Your dashboard has been updated.',
    )
    props.closeEditDashboardModal()
  }

  const handleClick = (e) => {
    e.preventDefault()
    props.toggleFavorite(e.currentTarget.id)
  }

  const isEdit = location.pathname === '/dashboard'

  if (posting || updating) {
     return (
       <div>
         <DotLoader size={50} color="#2196f3" className="content" />
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

      <div >
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <Budget />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TotalUsers />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TasksProgress />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sm={6}
                  xl={3}
                  xs={12}
                >
                  <TotalProfit />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >

                    {/* <LatestSales /><LatestSales /> */}
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >
                {/* <UsersByDevice /> */}
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={3}
                  xs={12}
                >

                  {/* <LatestProducts /> */}
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={12}
                  xl={9}
                  xs={12}
                >
                {/* <LatestOrders /> */}

                </Grid>
              </Grid>
            </div>

      <CopyLinkModal {...props} />
      <EditDashboardModal handleSubmit={handleSubmit} {...props} />
      <PostModal
        {...props}
        handlePostSubmit={handlePostSubmit}
        handleUpdateSubmit={handleUpdateSubmit}
      />
      <ConfirmDeleteModal {...props} />

      {/* This section is the user avatar, username, biography, etc. */}
      <div className="wrap" style={{ marginBottom: 60 }}>
        <div className="left" style={{ width: '37%' }}>
          {user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={user.home.flag} />}
        </div>
        <div className="right" style={{ textAlign: 'left', width: '63%', padding: 10 }}>
          <div style={{ height: 40 }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
          </div>
          <br />
          {
            isEdit && (
              <div style={{ height: 40 }}>
                <Button size="small" variant="outlined" onClick={() => props.openEditDashboardModal(user)}>
                Edit Dashboard
                </Button>
              </div>
            )
          }
          <br />
          <div style={{ height: 40 }}>
            {user.biography}
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', size: 1 }} />

              </main>
          </Container>
        </React.Fragment>
  )
}

const mapState = (state) => ({
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    user: state.user.user,
    fetched: state.user.fetched,
    showEditDashboardModal: state.modal.showEditDashboardModal,
    modalDashboard: state.modal.modalDashboard,
    showPostModal: state.modal.showPostModal,
    updatePostModal: state.modal.updatePostModal,
    modalPost: state.modal.modalPost,
    showConfirmDeleteModal: state.modal.showConfirmDeleteModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
})

const mapDispatch = (dispatch) => bindActionCreators({
    putUserData,
    openEditProfileModal,
    closeEditProfileModal,
    removeError,
    openPostModal,
    closePostModal,
    openUpdatePostModal,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    toggleFavorite,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Dashboard)

Dashboard.propTypes = {
  pk: number,
  authenticated: bool.isRequired,
  user: shape({}).isRequired,
  next: string,
  fetched: bool.isRequired,
  fetchingUserNext: bool.isRequired,
  showEditDashboardModal: bool.isRequired,
  modalDashboard: shape({}).isRequired,
  showPostModal: bool.isRequired,
  updatePostModal: bool.isRequired,
  modalPost: shape({}).isRequired,
  showConfirmDeleteModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  posting: bool.isRequired,
  updating: bool.isRequired,
  putUserData: func.isRequired,
  openEditProfileModal: func.isRequired,
  closeEditProfileModal: func.isRequired,
  removeError: func.isRequired,
  openPostModal: func.isRequired,
  closePostModal: func.isRequired,
  openUpdatePostModal: func.isRequired,
  openConfirmDeleteModal: func.isRequired,
  closeConfirmDeleteModal: func.isRequired,
  toggleFavorite: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
  location: shape({}).isRequired,
}

Dashboard.defaultProps = {
  modalLink: '',
  pk: null,
  next: '',
}
