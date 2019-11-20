import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'; 
import Typography from '../components/Typography';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';


const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.font.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h3" marked="center"  >
          How RivrBot Works

        </Typography>
        <Grid container spacing={8}>
            <Grid item xs={12} md={2} > </Grid>
            <Grid item xs={12} md={8} >
              <div className={classes.item} style={{ padding: 40 }} align="center">
                <Typography variant="h5" marked="center" >
                  { 'With RivrBot AI Assistant, your requests are encrypted and split into pieces client-side'}
                  { 'before being distributed across our network of high-performance Machine Learning nodes.'}
                 </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={2} > </Grid>
          </Grid>
        <div>
          <Grid container spacing={1}>
          <Grid item xs={12} md={1}>
            <div className={classes.item}>

            </div>
          </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <SwapCallsIcon
                  color="secondary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  Request Realestate Sellers or Buyers
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={1}>
              <div className={classes.item}>
                <DoubleArrowIcon
                  color="primary.dark"
                  style={{ fontSize: 80, }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <SelectAllIcon
                  color="secondary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  Select contacts and sellers lists
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={1}>
              <div className={classes.item}>
                <DoubleArrowIcon
                  color="primary.dark"
                  style={{ fontSize: 80, }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <MobileScreenShareIcon
                  color="secondary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  {' Manage and Monitor Client and Seller activities in reall-time. '}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

      </Container>
    </section>
  );
}
// <div className={classes.number}>1.</div>


ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
