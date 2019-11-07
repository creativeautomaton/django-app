import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import StorageIcon from '@material-ui/icons/Storage';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root} id="values">
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>

              <AmpStoriesIcon
                color="primary"
                style={{ fontSize: 80, }}
              />

              <Typography variant="h6" className={classes.title}>
                Instant Real Estate Contacts
              </Typography>
              <Typography variant="h5">
                {'Go from inventory to close in a day'}
                {', by finding buyers and sellers instantly.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <DataUsageIcon
                color="secondary"
                style={{ fontSize: 80, }}
              />
              <Typography variant="h6" className={classes.title}>
                New Ways to use Data
              </Typography>
              <Typography variant="h5">
                {'Ask a question and have RivrBot Answer you in 0.0125 seconds '}
                {'no two problems will be alike.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <StorageIcon
                color="primary"
                style={{ fontSize: 80, }}
              />
              <Typography variant="h6" className={classes.title}>
                Exclusive Rates
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially negotiated clients'}
                {'that you will not find anywhere else.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
