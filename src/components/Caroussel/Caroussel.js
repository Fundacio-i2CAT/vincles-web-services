import {Button, Grid} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React from 'react';
import {Link} from 'react-router-dom';


export default class extends React.Component {
  render() {
    const {content} = this.props;
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={75}
            totalSlides={content.length}
            visibleSlides={3}
        >
          <Slider>
            {content.map((slideContent, index) =>
                <Slide key={index} index={index}>
                  <Grid container direction='column' className='sliderItem' justify='flex-start'>
                    <Grid item style={{height: 90}}>
                      <Typography className='sliderTitle' gutterBottom>
                  <span className='sliderTitle'>
                  {slideContent.title}
                  </span>
                      </Typography>
                    </Grid>
                    <Grid item style={{height: 120}}>
                      <Typography className='sliderBody'>
                        {slideContent.body}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Link to={slideContent.link}>
                        <Button color='primary' variant='contained' className='sliderButton'> Més informació</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Slide>
            )}
          </Slider>
          <ButtonBack className='sliderButtons'><KeyboardArrowLeftIcon/></ButtonBack>
          <ButtonNext className='sliderButtons'><KeyboardArrowRightIcon/></ButtonNext>
        </CarouselProvider>
    );
  }
}
