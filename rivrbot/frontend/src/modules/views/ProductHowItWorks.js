import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import StorageIcon from '@material-ui/icons/Storage';

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
          How It Works
        </Typography>
        <Typography variant="h5" marked="center" >
            With Tardigrade cloud storage, your files are encrypted and split into pieces client-side
            before being distributed across our network of high-performance storage nodes.
         </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <StorageIcon
                  color="primary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  Appointment every Wednesday 9am.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <StorageIcon
                  color="primary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  First come, first served. Our offers are in limited quantities, so be quick.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <StorageIcon
                  color="primary"
                  style={{ fontSize: 80, }}
                />
                <Typography variant="h5" align="center">
                  {'New offers every week. New experiences, new surprises. '}
                  {'Your Sundays will no longer be alike.'}
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
