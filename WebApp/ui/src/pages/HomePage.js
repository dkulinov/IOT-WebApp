//Taken from the Free Templates at https://material-ui.com/getting-started/templates/
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from "../config.json"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © FoodGuard '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const [recordings, setrecordings] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(
      config.url + '/recording' + config.device_id,
      {
        method: "GET",
      }
    )
      .then(res => res.json())
      .then(response => {
        let sortedRecordings = Array.from(response.result, (rec)=> {
          let date = rec.link.split('_')[1]
          let time = rec.link.split('_')[2].split('.')[0]
          return {
            link: rec.link,
            date: new Date(Number(date.split('-')[0]), Number(date.split('-')[1])-1, Number(date.split('-')[2]), Number(time.split('-')[0]), Number(time.split('-')[1]), Number(time.split('-')[2]))
          }
        })
        sortedRecordings = sortedRecordings.sort((a, b) => b.date - a.date)
        setrecordings(sortedRecordings);
      })
      .catch(error => console.log(error));
  }, [recordings]);


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              FoodGuard
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            We are group of computer science students who are trying to
            prevent food theft from occurring at our customers' living space.
            We have made a product to find the thief quickly and ensure that
            food in the refrigerator is always being monitored.
            </Typography>
          </Container>
        </div>

        <Grid container spacing={4}  justify="center" direction="row" align-items="center">
          {recordings.map((c, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <div key={index}>
                {c.link && (
                  <>
                    <div style={{textAlign: "center"}}>
                      <h1>{String(c.date).split("GMT")[0]}</h1>
                    </div>
                    <div style={{textAlign: "center"}}>
                      <video width="500" controls> <source src={c.link}  type="video/mp4"/> </video>
                    </div>
                  </>
                )}
              </div>

            </Grid>
          ))}
        </Grid>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          FoodGuard
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        With our product, food theft will become one less thing to worry about!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}