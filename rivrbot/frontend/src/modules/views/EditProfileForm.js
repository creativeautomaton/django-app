import React, { useState } from 'react'
import { func, shape } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'

export default function EditProfileForm(props) {

  const {
    handleSubmit,
    user,
    closeEditProfileModal,
  } = props

  // console.log(user);
  // const address = {
  //     street: '123 state street',
  //     state:  'MO',
  //     zipcode: 63108
  // };


  const [street, setStreet] = useState(user.street)
  const [state, setState] = useState(user.state)
  const [zipcode, setZipcode] = useState(user.zipcode)
  const [country, setCountry] = useState(user.home.id)
  // console.log(street);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setStreet(event.target.value)
    setState(event.target.value)
    setZipcode(event.target.value)
    setCountry(event.target.value)
  }

  /*
  Importing JSON file with all of the country names and pks from the Django
  database. This array is mapped over to create the options of the Matrial
  UI select form.
  */
  const menuItems = [...countries].sort((a, b) => a.name > b.name).map((cntry) => (
    <MenuItem key={cntry.pk} value={cntry.pk}>{cntry.name}</MenuItem>
  ))

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel htmlFor="account Information" style={{ textAlign: 'left' }}  > User Account </InputLabel>
      <br />
      <TextField className="user-auth" type="text" label="Username" name="username" defaultValue={user.username} required />
      <br />
      <TextField className="user-auth" type="text" label="Email" name="email" defaultValue={user.email} required />
      <br />

      <InputLabel htmlFor="address" style={{ textAlign: 'left' }}  >Address</InputLabel>
        <TextField className="user-auth" type="text" label="Street" name="street" onChange={handleChange} defaultValue={user.street} required />
        <TextField className="user-auth" type="text" label="State" name="state" onChange={handleChange} defaultValue={user.state} required />
        <TextField className="user-auth" type="text" label="Zipcode" name="zipcode" onChange={handleChange} defaultValue={user.zipcode} required />
      <br />

      <FormControl >
        <InputLabel htmlFor="countries">Country</InputLabel>
        <Select style={{ textAlign: 'left' }} className="user-auth" name="country" onChange={handleChange} defaultValue={country}>
          {menuItems}
        </Select>
      </FormControl>
      <br />
      <TextField multiline rows="2" rowsMax="2" className="user-auth" type="text" label="Edit Bio" name="biography" defaultValue={user.biography} />
      <br />
      <Button variant="contained" color="primary" type="submit">Update</Button>
      <Button onClick={() => closeEditProfileModal()} color="secondary">Cancel</Button>
    </form>
  )
}

EditProfileForm.propTypes = {
  handleSubmit: func.isRequired,
  user: shape({}).isRequired,
  closeEditProfileModal: func.isRequired,
}
