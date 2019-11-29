import React, { useState } from 'react'
import { shape, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
// import countries from '../country_data'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CustomerSubscriptionForm(props) {

  const {
    handleSubmit,
    user
  } = props

 const classes = useStyles();
 const [product, setProduct] = React.useState('');
 const inputLabel = React.useRef(null);

 const handleChange = event => {
   console.log(event.target.value);
   setProduct(event.target.value);
 };

  return (
    <div className={classes.root}>
       <Grid container spacing={1}>
         <Grid item xs={12}>
         <Typography variant="h4" gutterBottom>
          Upgrade REVABOT Subscription
         </Typography>
         <hr />
         <br />
           <Paper className={classes.paper}>
           <Typography variant="h6" gutterBottom>
            If you would like to continue using REVABOT's Virtual Assisstant services, please select from the plans.
           </Typography>
           <form onSubmit={handleSubmit}>
             <FormControl className={classes.formControl}>
                 <InputLabel fullwidth id="demo-simple-select-label">Select Subscription Type</InputLabel>
                 <Select
                   autoWidth='true'
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   value={product}
                   onChange={handleChange}
                 >
                   <MenuItem value={'prod_GEtapYT8QnLyh4'}>$150/mo. Monthly Plan</MenuItem>
                   <MenuItem value={'prod_GGMQRq80nQ13yb'}>1 year Plan ($1500)</MenuItem>
                 </Select>
               </FormControl>
             <br />
             <Button style={{ marginTop: 10 }} fullwidth variant="contained" color="primary" type="submit">
             Upgrade RevaBot Plan
             </Button>
           </form>

           </Paper>
         </Grid>
      </Grid>
    </div>

  )
}

CustomerSubscriptionForm.propTypes = {
  handleSubmit: func.isRequired,
  user: shape({}).isRequired,
}
