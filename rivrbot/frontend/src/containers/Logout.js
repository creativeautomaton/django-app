import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authLogout } from '../actions/authActions'
import { Redirect } from 'react-router-dom'
import { func } from 'prop-types'

export function Logout(props) {
  useEffect(() => {
    function logout() {
      props.authLogout()
    }
    logout()
  }, [props, props.authLogout])

    return (
      <div className="content">
        <p>You have been logged out.</p>
        {
          !props.authenticated
          ? <Redirect to={props.location.state ? props.location.state.from.pathname : '/'} />
          : <Redirect to={props.location.state ? props.location.state.from.pathname : '/login'} />
        }
      </div>
    )
}

const mapState = () => ({
  })

const mapDispatch = (dispatch) => bindActionCreators({
    authLogout,
  }, dispatch)

export default connect(mapState, mapDispatch)(Logout)

Logout.propTypes = {
  authLogout: func.isRequired,
}
