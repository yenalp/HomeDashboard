import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import WaterLevelCylinder from './WaterTankLarge';
import OutSideTemperature from './Temperature';
import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';

$(function() {

    // slider type
    let $t = "slide"; // opitions are fade and slide
    //
    //     //variables
    let $f = 1000,  // fade in/out speed
        $s = 1000,  // slide transition speed (for sliding carousel)
        $d = 15000;  // duration per slide

    let $n = $('.slide').length; //number of slides
    let $w = $('.slide').width(); // slide width
    let $c = $('.container').width(); // container width
    let $ss = $n * $w; // slideshow width


    function timer() {
        $('.timer').animate({"width":$w}, $d);
        $('.timer').animate({"width":0}, 0);
    }


    // fading function
    function fadeInOut() {
        timer();
        let $i = 0;
        var setCSS = {
            'position' : 'absolute',
            'top' : '0',
            'left' : '0'
        }

        $('.slide').css(setCSS);

        //show first item
        $('.slide').eq($i).show();


        setInterval(function() {
            timer();
            $('.slide').eq($i).fadeOut($f);
            if ($i === $n - 1) {
                $i = 0;
            } else {
                $i++;
            }
            $('.slide').eq($i).fadeIn($f, function() {
                $('.timer').css({'width' : '0'});
            });

        }, $d);

    }

    function slide() {
        timer();
        var setSlideCSS = {
            'float' : 'left',
            'display' : 'inline-block',
            'width' : $c
        }
        var setSlideShowCSS = {
            'width' : $ss // set width of slideshow container
        }
        $('.slide').css(setSlideCSS);
        $('.slideshow').css(setSlideShowCSS);


        setInterval(function() {
            timer();
            $('.slideshow').animate({"left": -$w}, $s, function(){
                // to create infinite loop
                $('.slideshow').css('left',0).append( $('.slide:first'));
            });
        }, $d);

    }

    if ($t === "fade") {
        fadeInOut();

    } if ($t === "slide") {
        slide();

    } else {

    }
});


ReactDOM.render(<WaterLevelCylinder />, document.getElementById('water-level-cylinder'));
ReactDOM.render(<OutSideTemperature />, document.getElementById('outside-temp'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
