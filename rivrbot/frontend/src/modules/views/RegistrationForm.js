import React, { useState } from 'react'
import { bool, func, PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
// import MaskedInput from 'react-text-mask';
// import NumberFormat from 'react-number-format' ;
import { makeStyles } from '@material-ui/core/styles';
import { DotLoader } from 'react-spinners';
import countries from '../country_data.json';
import states from '../us_states_data.json';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

// function TextMaskCustom(props) {
//   const { inputRef, ...other } = props;
//
//   return (
//     <MaskedInput
//       {...other}
//       ref={ref => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//       placeholderChar={'\u2000'}
//       showMask
//     />
//   );
// }
//
// TextMaskCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
// };

// function NumberFormatCustom(props) {
//   const { inputRef, onChange, ...other } = props;
//
//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={inputRef}
//       onValueChange={values => {
//         onChange({
//           target: {
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       prefix="$"
//     />
//   );
// }
//
// NumberFormatCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default function RegistrationForm(props) {
  const [country, setCountry] = useState('')
  const [uSState, setUSState] = useState('')

  const { authenticating, handleSubmit } = props
  const handleChangeCountry = (event) => {
    setCountry(event.target.value)
  }
  const handleChangeState = (event) => {
    setUSState(event.target.value)
  }
  const [state, setState] = React.useState({
    checkedA: false
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    numberformat: '1320',
  });

  const handleChangeNumbers = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  /*
  Importing JSON file with all of the country names and pks from the Django
  database. This array is mapped over to create the options of the Matrial
  UI select form.
  */
  const menuCountryItems = [...countries].sort((a, b) => a.name > b.name).map((cntry) => (
    <MenuItem key={cntry.pk} value={cntry.pk}>{cntry.name}</MenuItem>
  ))
  const menuStateItems = [...states].sort((a, b) => a.name > b.name).map((state) => (
    <MenuItem key={state.pk} value={state.pk}>{state.name}</MenuItem>
  ))

  return (
    <div>
      {authenticating && (
      <div>
        <DotLoader size={50} color="#2196f3" className="content" />
        <br />
      </div>
)}
      <h1> Start your Free 14 day RevaBot Trial Today!</h1>
      <Card style={{ maxWidth: 400, margin: '0 auto' }}>
        <CardHeader title="Register" />
        <CardContent>

          <form onSubmit={handleSubmit}>
            <TextField className="user-auth" type="text" name="username" label="Username" required />
            <br />
            <TextField className="user-auth" type="text" name="email" label="Email" required />
            <br />
            <TextField  className="user-auth" type="password" name="password1" label="Password" required
                        helperText="Password must be atleat 8 characters with Capitals and numericals characters."
             />
            <br />
            <TextField  className="user-auth" type="password" name="password2" label="Confirm Password" required  />
            <br />
            <FormControl>
              <InputLabel style={{ textAlign: 'left', display: 'none' }} htmlFor="country">Country</InputLabel>
              <Select style={{ textAlign: 'left', display: 'none' }} className="user-auth" name="country" onChange={handleChange} value={country}>
                {menuCountryItems}
              </Select>
            </FormControl>
            <CardHeader title="Billing Information" />
            <TextField  className="user-auth" type="text" name="street"  label="Street" />
            <FormControl>
              <InputLabel  htmlFor="state">State</InputLabel>
              <Select className="user-auth" name="state" onChange={handleChangeState} value={uSState}>
                {menuStateItems}
              </Select>
            </FormControl>
            <TextField  className="user-auth" type="text" name="zipcode" label="zipcode" />
            <br />
            <br />
            <FormGroup row style={{ maxWidth: 240, margin: '0 auto' }}>
              <FormControlLabel control={
                <Checkbox
                  checked={state.checkedA}
                    onChange={handleChange('checkedA')}
                    value="checkedA"
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                />

              }  label="I agree to the Terms and Conditions of RevaBot LLC."
              />
            </FormGroup>
            <br />
            <br />
            <Button disabled={!state.checkedA} variant="contained" color="primary" type="submit">Register</Button>
            <Link to="/login" href=""><Button>Cancel</Button></Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

RegistrationForm.propTypes = {
  authenticating: bool.isRequired,
  handleSubmit: func.isRequired,
}
