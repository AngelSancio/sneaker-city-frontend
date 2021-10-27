import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './Home.css';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


function Home() {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    return (
        <div>
            <div className={'carousel'}>
                <AutoPlaySwipeableViews>
                    <div className={'carousel-slide'}>
                        <img alt="banner" src={'https://static.nike.com/a/images/f_auto/dpr_1.0/w_1777,c_limit/70d9e54e-94d6-40ae-9690-721a6b235df2/nike-membership.jpg'}></img>
                        <div className={'banner'}>
                            <Button className={'shop-btn'} variant={'outlined'}> 
                             <Link to={"/products"}> SHOP </Link>
                            </Button> 
                        </div>
                    </div>
                    <div className={'carousel-slide'}>
                        <img alt="banner" src={'https://media.gq.com/photos/5e9a053ddf7bcc00099c2b00/4:3/w_1500,h_1125,c_limit/jordan-ranking.jpg'}></img>
                        <div className={'banner'}>
                            <Button className={'shop-btn'} variant={'outlined'}> 
                            <Link to="/products"> SHOP </Link>
                            </Button> 
                        </div>
                    </div>
                    <div className={'carousel-slide'}>
                        <img alt="banner" src={'https://man-man.nl/app/uploads/2020/06/witte-Nike-sneakers.jpg'}></img>
                        <div className={'banner'}>
                            <Button className={'shop-btn'} variant={'outlined'}>  
                            <Link to="/products"> SHOP </Link>
                            </Button> 
                        </div>
                    </div>
                </AutoPlaySwipeableViews>
            </div>
        </div>
    )
}

export {Home};