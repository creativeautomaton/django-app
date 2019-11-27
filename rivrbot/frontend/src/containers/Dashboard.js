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
import TextField from '@material-ui/core/TextField';
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
import Snackbar from '../modules/components/Snackbar';
import { FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Budget from '../modules/views/Budget'
import TotalUsers from '../modules/views/TotalUsers'
import TasksProgress from '../modules/views/TasksProgress'
import TotalProfit from '../modules/views/TotalProfit'
// import LatestSales from '../modules/views/LatestSales'
// import UsersByDevice from '../modules/views/UsersByDevice'
// import LatestProducts from '../modules/views/LatestProducts'
// import LatestOrders from '../modules/views/LatestOrders'

const drawerWidth = 220;

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%',
    background: 'url(/static/onepirate/productCTAImageDots.png)',
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
});

export function Dashboard(props) {

  const [name, setName] = React.useState();

  const [open, setOpen, message] = React.useState(false);
  const handleSubmit = event => {
    event.preventDefault();
    console.log(event.target[0].form[0].value);
    const intentValue = event.target[0].form[0].value;
    setName('REVABOT has Started your intent on.. ' + intentValue);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // const clear =  ' ';
    //  setName({
    //   name: ''
    // })

  };

  const {
    next,
    classes,
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
  // const handlePostSubmit = (e) => {
  //   e.preventDefault()
  //   // e.target.countries.value must be split at the comma and then strings
  //   // must be converted into numbers.
  //
  //   props.closePostModal()
  // }
  // const handleUpdateSubmit = (e) => {
  //   e.preventDefault()
  //
  //   props.closePostModal()
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   props.putUserData(
  //     e.target.username.value,
  //     e.target.email.value,
  //     Number(e.target.country.value),
  //     e.target.biography.value,
  //     'Your dashboard has been updated.',
  //   )
  //   props.closeEditDashboardModal()
  // }

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   props.toggleFavorite(e.currentTarget.id)
  // }

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
      {/* This section is the user avatar, username, biography, etc. */}
      <div className="wrap" style={{ marginBottom: 60 }}>
        <div className="right" style={{ textAlign: 'left', width: '100%', padding: 2 }}>
          <div style={{ height: 40 }}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" id="intentSubmission">
                  <Typography variant="h4" gutterBottom>

                  </Typography>
                  <TextField
                      noBorder
                      // className={classes.textFiefld}
                     label="Start your First REVABOT Assistant"
                     style={{ margin: 8 }}
                     placeholder="Type in your needs..."
                     helperText="Input your first REVABOT intents for us to customize your assistant"
                     fullWidth
                     margin="normal"
                     value={name}
                     InputLabelProps={{
                       shrink: true,
                     }}
                 />
                 <Button
                   type="submit" color="secondary" variant="contained"
                   aria-label="RevaBot Logo"
                   styles={{ width: "100%", color: "#fff" }}
                   fullWidth
                   reset
                 >
                    <svg height="40pt" viewBox="-10 0 480 480" width="40pt" xmlns="http://www.w3.org/2000/svg"  color="white">
                          <path d="m376.066406 200h24c4.417969 0 8-3.582031 8-8v-24c0-4.417969-3.582031-8-8-8-4.417968 0-8 3.582031-8 8v16h-16c-4.417968 0-8 3.582031-8 8s3.582032 8 8 8zm0 0"/><path d="m187.859375 168c17.671875 0 32-14.328125 32-32s-14.328125-32-32-32c-17.675781 0-32 14.328125-32 32s14.324219 32 32 32zm0-48c8.835937 0 16 7.164062 16 16s-7.164063 16-16 16c-8.839844 0-16-7.164062-16-16s7.160156-16 16-16zm0 0"/><path d="m13.105469 165.34375c3.386719 1.75 7.148437 2.660156 10.960937 2.65625 10.183594 0 19.242188-6.464844 22.558594-16.097656l62.914062-.972656-10.976562 9.070312c-3.023438 2.484375-3.804688 6.789062-1.847656 10.175781l14.949218 25.824219.328126 36h-39.925782c-.46875.046875-.933594.140625-1.386718.28125-3.777344-11.121094-15.046876-17.875-26.636719-15.960938-11.585938 1.914063-20.085938 11.933594-20.085938 23.679688s8.5 21.765625 20.085938 23.679688c11.589843 1.914062 22.859375-4.839844 26.636719-15.960938.453124.140625.917968.234375 1.386718.28125h48c2.132813 0 4.179688-.851562 5.679688-2.367188 1.503906-1.515624 2.339844-3.570312 2.320312-5.703124l-.367187-40.546876 25.597656-9.597656c1.738281 1.125 3.503906 2.152344 5.289063 3.085938l5.398437 32.433594c.644531 3.855468 3.984375 6.683593 7.898437 6.679687h4.183594v40h-24c-4.417968 0-8 3.582031-8 8v116.703125l-69.65625 69.65625c-2.289062 2.289062-2.972656 5.730469-1.734375 8.71875s4.15625 4.9375 7.390625 4.9375h256c3.234375 0 6.152344-1.949219 7.386719-4.9375 1.238281-2.988281.554687-6.429688-1.730469-8.71875l-53.65625-53.65625v-42.472656l17.910156-29.832032c30.21875 18.234376 48.488282 27.617188 54.089844 27.617188h48c4.417969 0 8-3.582031 8-8v-44.6875l13.648438-13.648438c1.496094-1.503906 2.34375-3.539062 2.351562-5.664062v-24h11.6875c5.414063 0 10.464844-2.738281 13.417969-7.28125 2.949219-4.539062 3.40625-10.265625 1.207031-15.214844l-24.875-56c9.441406-11.242187 14.597656-25.457031 14.5625-40.136718.179688-52.949219-29.761718-101.390626-77.199218-124.910157l-23.203126-11.617187c-3.519531-1.753906-7.792968-.691406-10.078124 2.511718l-3.351563 4.648438h-54.167969v-16c0-4.417969-3.582031-8-8-8h-80c-4.417968 0-8 3.582031-8 8v32h-12.207031c-3.914063-.003906-7.257813 2.828125-7.898437 6.6875l-5.398438 32.425781c-1.785156.933594-3.554688 1.957031-5.289062 3.085938l-30.808594-11.542969c-3.660156-1.375-7.777344.101562-9.734375 3.488281l-8.066407 13.976563c-.207031 0-.375-.121094-.582031-.121094h-48.015625v-25.472656c11.019532-3.894532 17.628906-15.164063 15.652344-26.683594-1.976562-11.523438-11.964844-19.941406-23.652344-19.941406-11.691406 0-21.679687 8.417968-23.65625 19.941406-1.976562 11.519531 4.636719 22.789062 15.65625 26.683594v33.472656c0 4.417969 3.582032 8 8 8h47.878906c-.734374 2.949219.28125 6.054688 2.617188 8l25.375 20.894531c0 .585938 0 1.183594-.046875 1.777344l-77.296875 1.191406c-3.632812-10.140625-13.582031-16.621093-24.328125-15.839843-10.746094.777343-19.65625 8.621093-21.789063 19.179687-2.136718 10.5625 3.027344 21.25 12.628907 26.140625zm34.960937 82.65625c-4.417968 0-8-3.582031-8-8s3.582032-8 8-8c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8zm0-216c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8c-4.417968 0-8-3.582031-8-8s3.582032-8 8-8zm144 200h11.792969c3.90625 0 7.242187-2.824219 7.886719-6.679688l5.40625-32.433593c1.777344-.925781 3.546875-1.957031 5.28125-3.085938l30.824218 11.542969c3.660157 1.375 7.777344-.101562 9.734376-3.488281l3.386718-5.855469h37.6875c.589844-.046875 1.171875-.164062 1.734375-.351562l14.265625 19.015624v13.335938h-32v16h18.457032l-21.425782 8.566406c-3.039062 1.214844-5.035156 4.160156-5.03125 7.433594v16h-88zm86.925782-130.144531-3.375-5.855469h20.449218v32h-38.3125l19.398438-16c3.003906-2.484375 3.777344-6.765625 1.839844-10.144531zm17.074218 42.144531v32h-20.449218l3.375-5.855469c1.9375-3.378906 1.164062-7.660156-1.839844-10.144531l-19.398438-16zm-53.65625 197.65625 29.65625 29.65625v4.6875h-48v-88h16v48c0 2.121094.84375 4.15625 2.34375 5.65625zm-50.710937 106.34375h.367187v-.414062l30.023438-34.3125c1.277344-1.460938 1.976562-3.335938 1.976562-5.273438v-16h16v72h-62.402344zm-92.320313 16 58.34375-58.34375c1.5-1.5 2.34375-3.535156 2.34375-5.65625v-112h48v116.992188l-16 18.289062v-39.28125h-16v57.601562l-19.632812 22.398438zm217.375 0h-60.6875v-72h16v24c0 2.121094.84375 4.15625 2.34375 5.65625zm-38.289062-108.894531-22.398438-22.402344v-44.703125h24v32c0 2.757812 1.421875 5.320312 3.757813 6.785156 2.984375 1.871094 5.679687 3.519532 8.496093 5.253906zm68.136718-320.898438 17.105469 8.5625c42.003907 20.820313 68.515625 63.714844 68.359375 110.597657.035156 12.375-4.882812 24.25-13.65625 32.976562-2.339844 2.339844-3 5.878906-1.65625 8.902344l27 60.753906h-19.6875c-4.417968 0-8 3.582031-8 8v24h-1.375c-12.375.035156-24.246094-4.882812-32.96875-13.65625-3.140625-3.03125-8.128906-2.988281-11.214844.097656-3.085937 3.085938-3.128906 8.074219-.097656 11.214844 9.480469 9.511719 21.792969 15.6875 35.085938 17.601562l-3.085938 3.085938c-1.5 1.5-2.34375 3.535156-2.34375 5.65625v40l-39.242187.046875c-18.480469-8.546875-36.328125-18.414063-53.398438-29.519531l-.039062-.039063h-.050781c-3.765626-2.289062-7.542969-4.609375-11.269532-6.921875v-54.152344l34.96875-13.980468c3.039063-1.214844 5.03125-4.160156 5.03125-7.433594v-32c0-1.730469-.5625-3.414062-1.601562-4.800781l-22.398438-29.863281v-90.777344zm-146.535156-18.207031h64v16c0 4.417969 3.582032 8 8 8h50.742188l-25.246094 35.351562c-.976562 1.355469-1.5 2.980469-1.496094 4.648438h-29.6875l-3.386718-5.855469c-1.957032-3.386719-6.074219-4.863281-9.734376-3.488281l-30.792968 11.542969c-1.734375-1.128907-3.503906-2.160157-5.28125-3.085938l-5.4375-32.433593c-.644532-3.855469-3.980469-6.679688-7.886719-6.679688h-3.792969zm-86.105468 88 9.222656-16 28.410156 10.648438c2.550781.953124 5.410156.546874 7.589844-1.082032 3.011718-2.269531 6.28125-4.175781 9.738281-5.679687 2.503906-1.074219 4.289063-3.351563 4.734375-6.039063l4.976562-29.847656h18.449219l4.976563 29.855469c.445312 2.6875 2.230468 4.964843 4.734375 6.039062 3.457031 1.507813 6.722656 3.414063 9.738281 5.679688 2.179688 1.628906 5.035156 2.035156 7.582031 1.082031l28.417969-10.65625 9.214844 16-23.402344 19.257812c-2.101562 1.730469-3.179688 4.417969-2.855469 7.125.492188 3.734376.492188 7.515626 0 11.25-.324219 2.707032.753907 5.394532 2.855469 7.128907l23.402344 19.238281-9.214844 16-28.417969-10.648438c-2.546875-.953124-5.402343-.546874-7.582031 1.082032-3.015625 2.265625-6.28125 4.171875-9.738281 5.679687-2.503907 1.074219-4.289063 3.351563-4.734375 6.039063l-4.976563 29.847656h-18.457031l-4.960938-29.855469c-.445312-2.6875-2.230468-4.964843-4.734374-6.039062-3.457032-1.503907-6.726563-3.410157-9.734376-5.679688-2.183593-1.628906-5.042968-2.039062-7.59375-1.082031l-28.417968 10.65625-9.222656-16 23.402343-19.257812c.140625-.136719.277344-.285157.40625-.4375.15625-.148438.300781-.300782.441407-.464844.601562-.648438 1.085937-1.394532 1.4375-2.207032l.050781-.089843c.332031-.878907.507812-1.816407.511719-2.757813.027343-.113281.050781-.230468.0625-.34375 0-.097656-.046876-.175781-.054688-.273437-.007812-.097657 0-.367188 0-.550781-.492188-3.734376-.492188-7.515626 0-11.25.320312-2.707032-.757812-5.394532-2.863281-7.128907zm-97.007813 36.34375c.953125-1.910156 2.640625-3.351562 4.671875-4 4.09375-1.042969 8.292969 1.277344 9.589844 5.300781 1.296875 4.019531-.761719 8.355469-4.691406 9.898438-4.207032 1.351562-8.714844-.960938-10.066407-5.167969-.636719-1.996094-.460937-4.164062.496094-6.03125zm0 0"/><path d="m176.066406 320h16v16h-16zm0 0"/><path d="m176.066406 352h16v16h-16zm0 0"/><path d="m224.066406 224h16v16h-16zm0 0"/><path d="m256.066406 224h16v16h-16zm0 0"/><path d="m328.066406 80h16v32h-16zm0 0"/><path d="m328.066406 128h16v16h-16zm0 0"/><path d="m328.066406 160h16v16h-16zm0 0"/>
                      </svg>
                    </Button>
                 </form>
              <Snackbar
                open={open}
                onClose={handleClose}
                message={name}
              />
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

        </div>
      </div>

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
