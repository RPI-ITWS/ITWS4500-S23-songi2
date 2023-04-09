import React, { useEffect } from 'react';
import './css/homepage.css';
import soccerPlayerImg from './img/soccer_player.png';
import bettingImg from './img/betting.png';
import newsImg from './img/news1.png';
import premierImg from './img/premier_logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <div>
      <div class= "spectrum-background">
        <div class="container d-flex align-items-center flex-column my-5 py-5" data-aos="zoom-in" data-aos-delay="400">
            <img class="mb-5" src={soccerPlayerImg} alt="https://www.pngegg.com/en/png-zclys" />
            <h1 class="text-right text-uppercase ">Welcome to IT Soccer</h1>
            <p class="masthead-subheading font-weight-light ">The best place to get soccer info and set bettings</p>
        </div>

        {/* {<!-- This is for Matches Info -->} */}
        <div class="container py-5" data-aos="fade-in" data-aos-delay="400">
            <div class="row gx-0">

            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <div class="content">
                <h1>Match Info</h1>
                <h4>Take a look at information about previous matches played at Premier League</h4>
                    <p>The Premier League is the top professional football (soccer) league in England, consisting of 20 teams that compete against each other over the course of a season, which typically runs from August to May. It is considered to be one of the most popular and competitive football leagues in the world, attracting some of the best players, coaches, and teams.</p>
                </div>
            </div>

            <div class="col-lg-6 d-flex align-items-center">
                <img src={`${process.env.PUBLIC_URL}/node/static/media/premier_logo.1681bf2c1fb5bd757de1.png`} class="img-fluid" alt="https://1000logos.net/allpng/"/>
            </div>

            </div>
        </div>
        {/* <!-- This is for Betting Sites --> */}
        <div class="container py-5" data-aos="fade-in" data-aos-delay="400">
            <div class="row gx-0">

            <div class="col-lg-6 d-flex align-items-center" >
                <img src={`${process.env.PUBLIC_URL}/node/static/media/betting.f5a290d290e1ee3a35dc.png`} class="img-fluid" alt="https://www.pngwing.com/en/free-png-bbppy"/>
            </div>

            <div class="col-lg-6 d-flex flex-column justify-content-center" >
                <div class="content">
                <h1>Soccer Betting, Win Prizes</h1>
                <h4>No. You will not bet real money. Once you create an account, you will be able to bet points for fun!</h4>
                    <p>This is coming soon... Gambling is Bad! Gambling can be associated with significant risks, including financial losses, addiction, and other negative consequences. </p>
                </div>
            </div>
            </div>
        </div>

        {/* <!-- This is for Relevant News --> */}
        <div class="container" data-aos="fade-in" data-aos-delay="400">
            <div class="row gx-0">

            <div class="col-lg-6 d-flex flex-column justify-content-center">
                <div class="content">
                <h1>Relevant News</h1>
                <h4>Here are lists of current soccer news. Make sure you are up to date!</h4>
                    <p>Manchester City is accused of more than 100 violations, including failing to provide accurate financial information “that gives a true and fair view of the club's financial position”; not disclosing contractual payments to managers and players; and failing, as required, to cooperate with Premier League investigators.</p>
                </div>
            </div>

            <div class="col-lg-6 d-flex align-items-center">
                <img src={`${process.env.PUBLIC_URL}/node/static/media/news1.df01c80dd19c8d521258.png`} class="img-fluid" alt="https://www.pngwing.com/en/free-png-bhjsk/download"/>
            </div>

            </div>
        </div>
        </div>
    </div>
  );
}

export default HomePage;
