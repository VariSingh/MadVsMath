/*
 JQUERY: STOPWATCH & COUNTDOWN
 This is a basic stopwatch & countdown plugin to run with jquery. Start timer, pause it, stop it or reset it. Same behavior with the countdown besides you need to input the countdown value in seconds first. At the end of the countdown a callback function is invoked.
 */
$(document).ready(function () {
    (function ($) {

        $.extend({
            APP: {
                formatTimer: function (a) {
                    if (a < 10) {
                        a = '0' + a;
                    }
                    return a;
                },
                startTimer: function (dir) {

                    var a;

                    // save type
                    $.APP.dir = dir;

                    // get current date
                    $.APP.d1 = new Date();

                    switch ($.APP.state) {

                        case 'pause' :

                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;

                            break;

                        default :

                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime();

                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseInt($('#cd_seconds').val()) * 1000;
                            }

                            break;

                    }

                    // reset state
                    $.APP.state = 'alive';
                    $('#' + $.APP.dir + '_status').html('Running');

                    // start loop
                    $.APP.loopTimer();

                },
                pauseTimer: function () {

                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();

                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;

                    // change button value
                    $('#' + $.APP.dir + '_start').val('Resume');

                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Paused');

                },
                stopTimer: function () {

                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');

                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Stopped');

                },
                resetTimer: function () {
                    // reset display
                    $('#' + $.APP.dir + '_ms,#' + $.APP.dir + '_s,#' + $.APP.dir + '_m,#' + $.APP.dir + '_h').html('00');

                    // change button value
                    $('#' + $.APP.dir + '_start').val('Start');

                    // set state
                    $.APP.state = 'reset';
                    $('#' + $.APP.dir + '_status').html('Reset & Idle again');

                },
                endTimer: function (callback) {

                    // change button value
                    $('#' + $.APP.dir + '_start').val('Restart');


                    // set state
                    $.APP.state = 'end';

                    timeup = 1;
                    showresults();
                    $("#timeupmessage").text("Time Up").show(function () {
                        setTimeout(function () {
                            $("#timeupmessage").fadeOut();
                        }, 1000);
                    });

                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                    }

                },
                loopTimer: function () {

                    var td;
                    var d2, t2;

                    var ms = 0;
                    var s = 0;
                    var m = 0;
                    var h = 0;

                    if ($.APP.state === 'alive') {

                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();

                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                            // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td <= 0) {
                                // if time difference is 0 end countdown
                                $.APP.endTimer(function () {
                                    $.APP.resetTimer();
                                    $('#' + $.APP.dir + '_status').html('Ended & Reset');
                                });
                            }
                        }

                        // calculate milliseconds
                        ms = td % 1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {
                            // calculate seconds
                            s = (td - ms) / 1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                var m = (s - (s % 60)) / 60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    var h = (m - (m % 60)) / 60;
                                    if (h < 1) {
                                        h = 0;
                                    }
                                }
                            }
                        }

                        // substract elapsed minutes & hours
                        ms = Math.round(ms / 100);
                        s = s - (m * 60);
                        m = m - (h * 60);

                        // update display
                        $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                        $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                        $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                        $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));

                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer, 1);

                    } else {

                        // kill loop
                        clearTimeout($.APP.t);
                        return true;

                    }

                }

            }

        });

        $('#sw_start').on('click', function () {
            $.APP.startTimer('sw');
        });
        $('#cd_start').on('click', function () {
            $.APP.startTimer('cd');
        });

        $('#sw_stop,#cd_stop').on('click', function () {
            $.APP.stopTimer();
        });

        $('#sw_reset,#cd_reset').on('click', function () {
            $.APP.resetTimer();
        });

        $('#sw_pause,#cd_pause').on('click', function () {
            $.APP.pauseTimer();
        });

    })(jQuery);

});
$(function () {
    //$(".dial").knob();
});
function showrank()
{
    var fbid = 0;
    FB.api('/me', function (parentResponse) {
        fbid = parentResponse.id;
    }, function (fbid) {
        FB.api('/me/friends', function (response) {
            var dataString = fbid.id + "%%%";
            for (var i = 0; i <= response.data.length - 1; i++)
            {
                dataString = dataString + response.data[i].id + "%%%";
            }
            $.post("showFriendsRank.php",
                    {
                        data: dataString
                    },
            function (result) {
                var recdata = result.split(">>>");
                var len = (recdata.length);
                if (len <= 6)
                {
                    $("#rank7").hide();
                }
                else
                {
                    $("#rank7").show();
                }
                var uname;
                for (var i = 0; i < len; i++)
                {
                   
                    var j = i + 1;
               
                 
                    var newrankcontent = recdata[i].split("#");
                    var len2 = newrankcontent.length;
                  
                    var pic = "<div style='float:left;font-size:50;'>" + newrankcontent[0] + "</div><div class='imgcontainer'><img  width='40px' height='40px' src='https://graph.facebook.com/" + newrankcontent[1] + "/picture' /></div><div style='margin-top:10px;color:#2C04A8;font-weight:bold;'>" + newrankcontent[2] + "</div><div style='color:red;'>" + newrankcontent[3] + "</div>";

                    if (newrankcontent[0])
                    {
                        $("#rank" + j).html(pic).delay(j * 100).fadeIn();
                    }
                    // });
                    if (newrankcontent[0] > 6)
                    {
                        $("#rank7").show();
                    }
                    else
                    {
                        $("#rank7").hide();
                    }
                    
                }
            });
           
        }); //fb.api end
    });



    /* FB.api('/me', function(response) 
     {
     fbid = response.id;
    
     $.post("varitest.php",{yourid:fbid},
     function(result){
     //alert(result);
     
     var pre_recdata = result.split("^^^");
     var recdata = pre_recdata[0].split(">>>");
     
     
     var len = (recdata.length);
     
     if(len<=6)
     {
     $("#rank7").hide();
     }
     else
     {
     $("#rank7").show();
     }
     var uname;
     for(var i=0;i<len;i++)
     {
     
     var j=i+1;
     
     
     var newrankcontent = recdata[i].split("#");
     var len2 = newrankcontent.length;
     
     //FB.api(newrankcontent[1], {fields: 'name'}, function(response) {
     //
     //
     var pic = "<div style='float:left;font-size:50;'>"+newrankcontent[0]+"</div><div class='imgcontainer'><img  width='40px' height='40px' src='https://graph.facebook.com/"+newrankcontent[1]+"/picture' /></div><div style='margin-top:10px;color:#2C04A8;font-weight:bold;'>"+newrankcontent[2]+"</div><div style='color:red;'>"+newrankcontent[3]+"</div>";
     $("#rank"+j).html(pic);
     // });
     
     }
     //$("#message_container1").html("<div>rank>"+newrankcontent[0]+"</div><div>"+newrankcontent[1]+"</div><div>"+newrankcontent[1]+"</div>");
     });
     }); */
}
function startgame() {

    /*---------disable tab key (start)-----------*/
    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })

    /*---------disable tab key (end)-----------*/


    /* FB.api('/me', function(response){
     
     }); */
    percentage = 0;//used to show the question progress in progressbar
    cheatcount = 0;//how many times user cheated
    timeup = 0;//0 No  1 Yes
    score = 0;//initially score is zero
//coins=0;//initialy user does not have any coins
    count = 0;//question number  ...increment and use it
    levelcount = 20;//total number of levels allowed
    currentlevel = 1;//current level number
    countvar = 10;//total number of questions to ask (maybe per level)
    mistakes = 0;//total numberof mistakes made(maybe per level)
    levelbonus = 0;//bonus score to be added each time user completes level..static right now
    timeleft = 0;//initialize to zero..hope this works
    stoptimer_count = 0;//how many times timer is stopped
    $("#level").text("level " + currentlevel);
    $("#levelslide").text("Level " + currentlevel);
//$("#gameover").hide();
    $("#mistakes").hide();
    $("#totaltimetaken").hide();
    $("#candybox").hide();
    $("#answer").css("border-color", "#571A02");
    $("#message_container").hide();
    $("#countone").css({"top": "-79px"});
    $("#counttwo").css({"top": "-79px"});
    $("#countthree").css({"top": "-79px"});
//$('#chatAudio')[0].play();
    $("#coins").text("candies: " + coins);
    $("#score").text("score: " + score);
    $("#level").text("level " + currentlevel);
    $("#stoptimer").click(function () {
        if ($("#practicecontainer").is(":visible"))
        {
            if (stoptimer_count < 3)
            {
                if (coins >= 500)
                {
                    coins -= 200;
                    stoptimer_count++;
                    $("#coins").text("candies: " + coins);//show reduced coins
                    $("#candy").css({"top": "331px", "opacity": "1"});
                    $("#candy").text("-200").animate({"top": "160px", "opacity": "0"});
//timer("stop");
                    $('#cd_pause').trigger("click");
                    setTimeout(function () {
                  
//timer("restart");
                        $('#cd_start').trigger("click");
                    }, 5000);
                }
                else
                {
                    $("#timeralert").text("You don't have enough candies to do this").show(function () {
                        setTimeout(function () {
                            $("#timeralert").fadeOut();
                        }, 1000);
                    });
                }
            }
            else
            {
                $("#timeralert").text("You can only stop timer 3 times in a level").show(function () {
                    setTimeout(function () {
                        $("#timeralert").fadeOut();
                    }, 1000);
                });
//alert("You can only stop timer three times in a level");
            }
        }
        else
        {
            $("#timeralert").text("You can't use it right now").show(function () {
                setTimeout(function () {
                    $("#timeralert").fadeOut();
                }, 1000);
            });
        }
    });
    $("#continue").click(function () {
        $("#practiceContainer11").hide();
        $('#cd_start').trigger("click");
    });
    $("#cheat").click(function () {
        if ($("#message_container").is(":visible"))
        {
            if (coins >= 1500)
            {
                if (cheatcount < 3)
                {
                    if (mistakes > 0)
                    {
                        mistakes--;
                        score += 5;
                        coins -= 300;
                        cheatcount++;
                        $.post("cheatupdate.php",
                                {
                                    cheater_id: uid,
                                    cheater_score: score,
                                    cheater_candies: coins
                                },
                        function (result) {
//alert("server response to cheating"result);
                            if (result == 1 || result == 0)
                            {
                                
                                $("#candybox_candies").text(coins);
                                $("#mistakes").text("Mistakes: " + mistakes + " x 5 Score");
                                $("#totaltimetaken").text("Score: " + score);
                              
//alert("So you are left with "+coins+" candies");
                                showrank();
                            }
                            else
                            {
                                
                            }
                        });
//
                    }
                    else
                    {
                        $("#cheatalert").text("Cheers! No more mistakes").show(function () {
                            setTimeout(function () {
                                $("#cheatalert").fadeOut();
                            }, 1000);
                        });
                    }
                }
                else
                {
                    alert("You can only cheat on 3 mistakes in a game");
                }
            }
            else
            {
                $("#cheatalert").text("You don't have enough coins for this").show(function () {
                    setTimeout(function () {
                        $("#cheatalert").fadeOut();
                    }, 1000);
                });
            }
        }
        else
        {
            $("#cheatalert").text("You can't use it right now").show(function () {
                setTimeout(function () {
                    $("#cheatalert").fadeOut();
                }, 1000);
            });
        }
    });
    $("#back").click(function () {
        if ($("#difficultycontainer").is(":visible"))
        {
            $(this).hide();
            $("#difficultycontainer").hide();
            $("#practice_classic").show();
        }
        else if ($("#practicecontainer").is(":visible"))
        {
//timer("stop");
            $('#cd_stop').trigger("click");
            $("#practicecontainer").hide();
            $("#difficultycontainer").show();
        }
    });

    $(".inviteFriends").click(function () {
        $("#request").trigger("click");
    });

    /* $("#invtfrnds").click(function(){
     $("#request").trigger("click");
     }); */
//show splash screen for 3 seconds then hide it and display practice_classic options
//$("#splash").show();
    setTimeout(function () {
        $("#mad").fadeIn();
    }, 1000);
    setTimeout(function () {
        $("#vs").fadeIn();
    }, 1500);
    setTimeout(function () {
        $("#math").fadeIn();
    }, 2000);
    setTimeout(function () {
        $("#mad,#vs,#math").hide()
    }, 3000);
    setTimeout(function () {
//$("#splash").hide();
        $("#practice_classic").show();
        $("#exit").show();
    }, 4000);
    $("#practice_button").click(function (e) {
        $("#practice_button").stop();
        $("#classic_button").stop();
        $("#practice_classic").hide();
        $("#countone,#counttwo,#countthree").css({"top": "-79px;"});
        $("#difficultycontainer").show();
//$("#back").show();
    });
    $("#classic_button").click(function (e) {
        if (e.handled !== true) // This will prevent event triggering more then once
        {
            $("#quitMessage").hide();
            $("#practice_classic").hide();
            $(".progressbarInner").width("0%");
            countthree();
            countvar = 10;//total number of questions to ask (maybe per level)
          
            count = 0;//initializing the question number
            setTimeout(function () {
                $("#count_three_container").fadeOut();
         
                max = 100;//please do not remove this variable max
                process(max);
                $("#totaltimetaken").addClass("showworldrank");
                $("#practicecontainer").show();
//timer("start");
                $('#cd_start').trigger("click");
                $("#answer").focus();
            }, 4000);
            e.handled = true;
        }//e.handled end
    });
    $("#quit").click(function () {
        $("#countone,#counttwo,#countthree").css("top", "-79");

        $("#quitMessage").show();
    });
    $(".YesQuit").click(function () {
      
        $(this).parent().hide();
        $('#cd_stop').trigger("click");
        $("#practicecontainer").hide();
        /*--------------reinitializing everything(start)----------------*/

        currentlevel = 1;//current level number
        count = 0;//question number  ...increment and use it
        mistakes = 0;//total numberof mistakes made(maybe per level)
        levelbonus = 0;
        percentage = 0;//used to show the question progress in progressbar
        cheatcount = 0;//how many times user cheated
        $("#levelslide").text("Level 1").hide();
        /*--------------reinitializing everything(end)----------------*/


        $("#practice_classic").show();
        $(".progressbarInner").width("0%");

        FB.api('/me', function (response)
        {
            uname = response.name;
            uid = response.id;
    
            $.post("madvsmath.php",
                    {
                        name: uname,
                        userid: uid,
                        timestring: 0,
                        userscore: score,
                        ucurrentlevel: currentlevel,
                        ucandies: coins
                    },
            function (result) {
               
                score = 0;//initialize score to zero only after sending original score to server
                showrank();
                if (result == "maxscoreupdated")
                {
                    var params = {};

                    if (typeof score !== "undefined" && result == "maxscoreupdated") {
                        post = "Yeah! I improved my scores to " + score + " on MadVsMath. C'mon beat my score";
                    }
                    else
                    {
                        post = "Hey! Beat my score on MadVsMath"
                    }
                    var privacy = {value: 'EVERYONE'};
                    params['message'] = post;
                    params['name'] = 'MadvsMath';
                    params['description'] = 'beat my math speed on madvsmath';
                    params['link'] = 'https://apps.facebook.com/madvsmath/';
                    params['picture'] = 'https://m.ak.fbcdn.net/photos-b.ak/hphotos-ak-xap1/t39.2081-0/10173492_337054396446153_2074476391_n.png';
                    params['caption'] = 'Beat my Score';
                    params['privacy'] = privacy;

                    FB.api('/me/feed', 'post', params, function (response) {
                        if (!response || response.error) {
                          //  
                        } else {
                         //   
                        }
                    });

                }
                else
                {
                 //   
                }

            });
  
        });
    });
    $(".NoQuit").click(function () {
        $(this).parent().hide();
    });
    $("#progresschart").click(function () {
        alert("progresschart alert");
    });
    $("#worldrank").click(function () {
        /*
         $.post("varitest.php",
         {
         
         name:      uname,
         userid:    uid,
         },
         function(result){
         //alert(result);
         
         var recdata = result.split(">>>");
         
         var len = (recdata.length);
         
         for(var i=0;i<len;i++)
         {
         var j=i+1;
         
         var newrankcontent = recdata[i].split("#");
         var len2 = newrankcontent.length;
         
         var pic = "<div style='float:left;'>"+newrankcontent[0]+"</div><div style='border:1px solid #EBFF00; float:left;'><img  width='40px' height='40px' src='https://graph.facebook.com/"+newrankcontent[1]+"/picture' /></div><div>"+newrankcontent[2]+"</div><div>"+newrankcontent[3]+"</div>";
         $("#rank"+j).append(pic);
         }
         $("#message_container1").html("<div>rank>"+newrankcontent[0]+"</div><div>"+newrankcontent[1]+"</div><div>"+newrankcontent[1]+"</div>");
         });
         */
    });
    $(document).keydown(function (e) {

        if (e.keyCode == 13 && $("#continueLevel").is(":visible")) {


            $("#answer").blur();
            $(".continueButton").focus();
            $("#continueLevel").hide();
            $("#classic_button").trigger("click");

        }
    });
    $("#answer").keypress(function (e) {
        if (e.handled !== true) // This will prevent event triggering more then once
        {

            if (e.keyCode == 13 && !$(".continueLevel").is(":visible"))//on enter button press
            {
                var result = checkanswer();
                if (result)
                {
                    percentage = (count + 1) * 10;
                    $(".progressbarInner").animate({width: percentage + "%"});
                    score += parseInt(5);
                    coins += parseInt(5);
                    $("#coins").text("candies: " + coins);
                    $("#score").text("score: " + score);
                    $("#level").text("level " + currentlevel);
                    $("#answer").val("").css("border-color", "#571A02");
                    count++;
                    if (count >= countvar)
                    {
                        showresults();
                    }
                    else
                    {
                        process(max);
                    }
                }
                else if (!result)
                {
                    shakediv();
                }
            }

            e.handled = true;
        }
    });
}//startgame ends here
//prefetching stuff starts
//http://ditio.net/demo/preloader/
(function ($) {
    var imgList = [];
    $.extend({
        preload: function (imgArr, option) {
            var setting = $.extend({
                init: function (loaded, total) {
                },
                loaded: function (img, loaded, total) {
                },
                loaded_all: function (loaded, total) {
                }
            }, option);
            var total = imgArr.length;
            var loaded = 0;

            setting.init(0, total);
            for (var i in imgArr) {
                imgList.push($("<img />")
                        .attr("src", imgArr[i])
                        .load(function () {
                            loaded++;
                            setting.loaded(this, loaded, total);
                            if (loaded == total) {
                                setting.loaded_all(loaded, total);
                            }
                        })
                        );
            }

        }
    });
})(jQuery);
$(function () {

    $.preload([
        "images/sprites.png", "images/mad.png", "images/vs.png", "images/countthreebackground.png"
    ], {
        init: function (loaded, total) {
           // 
        },
        loaded: function (img, loaded, total) {
            //

            //$("body").appendTo(img);
        },
        loaded_all: function (loaded, total) {
            //
            //$('<audio id="chatAudio"><source src="backgroundsound.wav" type="audio/wav"></audio>').appendTo('body');
            startgame();

        }
    });
});
//prefetching stuff ends
var timeup = 0;//0 No  1 Yes
var score = 0;//initially score is zero
var coins = 0;//initialy user does not have any coins
var count = 0;//question number  ...increment and use it
var levelcount = 10;//total number of levels allowed
var currentlevel = 1;//current level number
var countvar = 10;//total number of questions to ask (maybe per level)
var mistakes = 0;//total numberof mistakes made(maybe per level)
var levelbonus = 0;//bonus score to be added each time user completes level..static right now
var timeleft = 0;//initialize to zero..hope this works
//------------------------------------------------------shakediv start
function shakediv() {
    $("#answer").val("").css("border-color", "#ff0000");
    var l = 20;
    for (var i = 0; i < 10; i++)
    {
//
        $("#answer").animate({"left": "+=" + (l = -l) + 'px'}, 50);
    }
}
//------------------------------------------------------shakediv start
function showresults() {
    $('#cd_stop').trigger("click");
    var mis = "Mistakes: " + mistakes + " x 5 Score";
    var timetaken = calcTotalTime(mistakes);
    var res2 = timetaken.split(":");
    timeleft += (parseInt(res2[0]) * 60) + parseInt(res2[1]);
    if (currentlevel < levelcount && timeup == 0)
    {
        stoptimer_count = 0;
        $("#continueLevel").delay(1000).fadeIn();
        $("#answer").blur();
        $(".continueButton").focus();
        $(".continueButton").click(function () {
            $("#classic_button").trigger("click");
            $(this).parent().hide();
        });

        currentlevel++;
        if (currentlevel == 11)
        {
            setTimeout(function () {
                $('#cd_stop').trigger("click");
            }, 5000);
//$('#cd_reset').trigger("click");
            $("#practiceContainer11").show();
        }
        $("#coins").text("candies: " + coins);
        $("#score").text("score: " + score);
        $("#level").text("level " + currentlevel);
    }
    else
    {
        $("#practicecontainer").fadeOut();
        setTimeout(function () {
            $("#message_container").show();
        }, 700);
        setTimeout(function () {
            $("#mistakes").text(mis).show();
        }, 2500);
        setTimeout(function () {
            $("#candybox").text("Candies: " + coins).show();
        }, 3000);
        setTimeout(function () {
            $("#increaseScore").slideDown();
        }, 4000);
        setTimeout(function () {
            if ($("#totaltimetaken").hasClass("showworldrank"))
            {
                var levelbonus = 20;//extra bonus score given on completion of each level
                var leveltime = 60;//max time given to level
                if (count == countvar)//user completed all questions
                {
                   // 
                    score = parseInt(score) + parseInt(levelbonus) - (parseInt(mistakes) * 5);
                    coins = parseInt(coins) + parseInt(levelbonus) - (parseInt(mistakes) * 5);
                }
                else//Time is up so user could not complete all the questions
                {
                    //
//score += parseInt(count)*5;
                }
                score -= (parseInt(mistakes * 5) + timeleft);
                if (score < 0)
                {
                    score = 0;
                }
                $("#totaltimetaken").text("Score: " + score).show(function () {
                });
//timer("stop");
                $('#cd_stop').trigger("click");
//coins=score;
//alert("You got "+coins+" coins");
//mistakes
//bonus
//score=bonus+(count)
                FB.api('/me', function (response)
                {
                    uname = response.name;
                    uid = response.id;
                    $.post("madvsmath.php",
                            {
                                name: uname,
                                userid: uid,
                                timestring: timetaken,
                                userscore: score,
                                ucurrentlevel: currentlevel,
                                ucandies: coins
                            },
                    function (result) {

                        showrank();
                        if (result == "maxscoreupdated")
                        {
                            var params = {};

                            if (typeof score !== "undefined" && result == "maxscoreupdated") {
                                post = "Yeah! I improved my scores to " + score + " on MadVsMath. C'mon beat my score";
                            }
                            else
                            {
                                post = "Hey! Beat my score on MadVsMath"
                            }
                            var privacy = {value: 'EVERYONE'};
                            params['message'] = post;
                            params['name'] = 'MadvsMath';
                            params['description'] = 'beat my math speed on madvsmath';
                            params['link'] = 'https://apps.facebook.com/madvsmath/';
                            params['picture'] = 'https://m.ak.fbcdn.net/photos-b.ak/hphotos-ak-xap1/t39.2081-0/10173492_337054396446153_2074476391_n.png';
                            params['caption'] = 'Beat my Score';
                            params['privacy'] = privacy;

                            FB.api('/me/feed', 'post', params, function (response) {
                                if (!response || response.error) {
                                   // 
                                } else {
                                   // 
                                }
                            });

                        }
                        else
                        {
                           // 
                        }

                    });
                });
            }
        }, 3500);
    }
//timer("stop");
    $('#cd_stop').trigger("click");
}
//------------------------------------------------------Calculate totaltime start
function calcTotalTime(mistakes) {
//var str = $(".timer").text();
    var str = $("#cd_m").text() + ":" + $("#cd_s").text() + ":" + $("#cd_ms").text();
    var res = str.split(":");
    var penality = mistakes * 5;//5 seconds penality for each mistake
    res[1] = parseInt(res[1]) + penality;
    if (res[1] >= 60)
    {
        var add_min = Math.floor(res[1] / 60);
        var add_sec = res[1] % 60;
        res[0] = res[0] + add_min;
        res[1] = add_sec;
//return res[0]+":"+res[1]+":"+res[2];
    }
    var time = res[0] + ":" + res[1] + ":" + res[2];
    return time;
}
//------------------------------------------------------Calculate totaltime start end
//------------------------------------------------------timer start
var id = 0;
var mistakes = 0;
/* function timer(state){
 if(state=="start")
 {
 millisec = 10; //miliseconds
 sec  = 60; //seconds
 min  = 0; //minutes
 id = setInterval(function(){
 $(".timer").text(min+":"+sec+":"+millisec);
 millisec--;
 if(millisec=="0")
 {
 millisec=10;
 sec--
 }
 if(sec=="0")
 {
 timer("stop");
 $(".timer").text(min+":"+sec+":"+millisec);
 timeup=1;
 showresults();
 $("#timeupmessage").text("Time Up").show(function(){
 setTimeout(function(){
 $("#timeupmessage").fadeOut();
 },1000);
 });
 //alert("Time Up. questions count: "+count);
 //sec=60;
 //min--;
 }
 },100);
 }
 else if(state=="stop")//this should be called only after timer("start") has been called
 {
 clearInterval(id);
 }
 else if(state=="restart")//min,sec,millisec are not initialized here because I am taking the already stored values
 {
 id = setInterval(function(){
 $(".timer").text(min+":"+sec+":"+millisec);
 if(millisec>0)
 {
 millisec--;
 }
 if(millisec=="0")
 {
 millisec=10;
 sec--
 }
 if(sec=="0")
 {
 timer("stop");
 //$(".timer").text(min+":"+sec+":"+millisec);
 timeup=1;//you'r slow my friend. Game Over
 showresults();
 //alert("Time Up. questions count: "+count);
 //sec=60;
 //min--;
 }
 },100);
 }
 } */
//------------------------------------------------------timer end
//------------------------------------------------------checkanswer start
function checkanswer()//check answer
{
    if (quest == $("#answer").val())
    {
        $("#answer").val("");

        return 1; //correct
    }
    else
    {
        mistakes++;
        $("#answer").val("");
        return 0;  //wrong
    }
}
//------------------------------------------------------checkanswer end
//------------------------------------------------------prime start
function prime(max) {
    var min = 1;
    var flag = 0;
    var a = parseInt(Math.random() * (max - min) + min);
    for (var i = 2; i <= a / 2; ++i)
    {
        if (a % i == 0)
        {
            flag = 1;
            break;
        }
    }
    if (flag == 0)
    {
        prime(max);
    }
    else {
        var b = parseInt(Math.random() * (a - min) + min);
        while (a % b != 0)
        {
            var b = parseInt(Math.random() * (a - min) + min);
        }
        quest = a / b;
        if (currentlevel > 10)
            var label = a + "x" + b;
        else
            var label = a + "/" + b;
        $(".question").text(label);
//checkanswer(quest);
    }
}
//------------------------------------------------------prime start
//------------------------------------------------------process start
function process(max) {// most of the logic goes here
    if (currentlevel == 1)
    {
//alert("(inside currentlevel)"+currentlevel);
        max = 10;
        var min = 1;
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        while (symbol == 3)
        {
            symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
            symbol = parseInt(symbol);
        }
       
    }
    else if (currentlevel == 2)
    {
//alert("(inside currentlevel)"+currentlevel);
     
        max = 15;
        var min = 5;
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
       
        while (symbol == 3)
        {
            symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
            symbol = parseInt(symbol);
        }
        
    }
    else if (currentlevel == 3)
    {
        
        max = 20;
        var min = 5;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
     
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 4)
    {
       
        max = 20;
        var min = 10;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
    
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 5)
    {
       
        max = 25;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 6)
    {
     
        max = 35;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
      
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 7)
    {
       
        max = 40;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
       
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 8)
    {
       
        max = 45;
        var min = 20;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
   
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 9)
    {
       
        max = 50;
        var min = 20;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
  
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 10)
    {
        
        max = 100;
        var min = 30;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 11)
    {
        
        max = 10;
        var min = 1;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 12)
    {
//alert("(inside currentlevel)"+currentlevel);
        
        max = 15;
        var min = 5;
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        while (symbol == 3)
        {
            symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
            symbol = parseInt(symbol);
        }
        
    }
    else if (currentlevel == 13)
    {
        
        max = 20;
        var min = 5;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 14)
    {
        
        max = 20;
        var min = 10;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 15)
    {
        
        max = 25;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 16)
    {
        
        max = 35;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 17)
    {
        
        max = 40;
        var min = 15;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 18)
    {
        
        max = 45;
        var min = 20;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 19)
    {
        
        max = 50;
        var min = 20;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else if (currentlevel == 20)
    {
        
        max = 100;
        var min = 30;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
    else {
        
        max = 10;
        var min = 1;
        var symbol = Math.random() * (3.99) + 1;//plus=1,minus=2,multiply=3,divide=4
        symbol = parseInt(symbol);
        
        var a = parseInt(Math.random() * (max - min) + min);
        var b = parseInt(Math.random() * (max - min) + min);
    }
//symbol = 1; //harcoding symbol just for testing
    switch (symbol)
    {
        case 1:
        {
            
            quest = a + b;
            
            if (currentlevel > 10)
                var label = a + "-" + b;
            else
                var label = a + "+" + b;
            $(".question").text(label);
//checkanswer(quest);
            break;
        }
        case 2:
        {
            if (b > a)
            {
                var c = a;
                a = b;
                b = c;
            }
            quest = a - b;
            if (currentlevel > 10)
                var label = a + "+" + b;
            else
                var label = a + "-" + b;
            $(".question").text(label);
//checkanswer(quest);
            break;
        }
        case 3:
        {
            quest = a * b;
            if (currentlevel > 10)
                var label = a + "/" + b;
            else
                var label = a + "x" + b;
            $(".question").text(label);
//checkanswer(quest);
            break;
        }
        case 4:
        {
            prime(max);
            break;
        }
    }
}
//------------------------------------------------------process start
function animatenumbers() {
    if (count == 0)
    {
        if (parseInt($("#countone").css("top")) == -79)
        {
            setTimeout(function () {
                $("#countthree").stop().animate({"top": "115px", "opacity": 1}).delay(400).animate({"top": "360px", "opacity": 0});
            }, 700);
            setTimeout(function () {
                $("#counttwo").stop().animate({"top": "115px", "opacity": 1}).delay(400).animate({"top": "360px", "opacity": 0});
            }, 1700);
            setTimeout(function () {
                $("#countone").stop().animate({"top": "115px", "opacity": 1}).delay(400).animate({"top": "360px", "opacity": 0}, function () {

//$("#back,#exit").fadeIn();
                });
            }, 2700);
            $("#countone,#counttwo,#countthree").css("top", "-79");
        }
    }
    else
    {
    }
}
function slidelevel() {
    $(".progressbarInner").width("0%");
//$("#back,#exit").hide();
    var levelplusplus = currentlevel + 1;
    $("#levelslide").text("Level " + currentlevel).show();
    setTimeout(function () {
    }, 1000, function () {
        $("#levelslide").hide();
        $("#answer").focus();
        $("#back,#exit").fadeIn();
    });
}
function countthree() {
    if (count > 0)
    {
        score += (parseInt(20 * currentlevel) + parseInt(timeleft));/*level bonus is added here*/
        
        if (score < 0)//if score is negative then make it zero
        {
            score = 0;
        }
        coins += parseInt(5);
    }
    $("#coins").text("candies: " + coins);
    $("#score").text("score: " + score);
    $("#level").text("level " + currentlevel);
    $("#practicecontainer").hide();
    $("#difficultycontainer").hide();
    $("#count_three_container").fadeIn();
    /*
     setTimeout(function(){
     $("#showlevel").text("Level "+currentlevel).fadeIn();
     },100,function(){
     $("#showlevel").hide();
     animatenumbers();
     });*/
    if (count == 0)
    {
        animatenumbers();
    }
    else
    {
//levelbonus+=10;
        slidelevel();
    }
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '337016859783240',
        xfbml: true,
        version: 'v2.0',
        status: true,
    });

    if (typeof facebookInit == 'function') {
        facebookInit();
    }
};



function facebookInit() {
    //FB.login(function(){}, {scope: 'publish_actions'});
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            //var accessToken = response.authResponse.accessToken;

            //calldb();//check from db if this is first time user of has already played
            //calldb(){

            FB.api('/me', function (response)
            {
                firstname = response.first_name;
                lastname = response.last_name;
                gender = response.gender;
                uid = response.id;
                emailid = response.email;
                
                $.post("varun.php",
                        {
                            ufirstname: firstname,
                            ulastname: lastname,
                            userid: uid,
                            emailId: emailid,
                            ugender: gender
                                    //ulocation:     location
                        },
                function (result) {
                    
                    var n = result.search("Welcome back");
                    if (n == -1)//result does not contain Welcome back text
                    {
                        
                    }
                    else if (n != -1) {//result contains welcome back text
                        
                        candiesData = result.split("back");
                        
                        //candiesData = candiesData[1];
                        //candiesData = candiesData.split("#");
                        var len = candiesData[1].length;
                        var candiesString = candiesData[1].split("#");
                        
                        coins = parseInt(candiesString[1]);
                        //score = parseInt(candiesString[2]);	  
                        $("#coins").text("candies: " + coins);
                        $("#score").text("score: " + score);
                    }
                });
                            });

            showrank();
        }
        else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            FB.login(function () {
                location.reload();
//window.location.href = "https://apps.facebook.com/mad_vs_math/";
            }, {scope: 'public_profile,publish_actions,user_friends,email'});//user_location
        } else {
            alert("Please Log in first");
            // the user isn't logged in to Facebook.
        }
    });
    function requestCallback(response)
    {
        if (response && response.request) {
            // Here, requests have been sent, facebook gives you the request and the array of recipients

            var extraBonus = 10 * parseInt(response.to.length);
            //setTimeout(function(){
            score = score + extraBonus;
            $.post("updatescore.php",
                    {
                        updatedScore: score,
                        uniqueId: uid
                    },
            function (result) {
                if (result == 1)
                {
                    $("#increaseScore span").text("Request Sent! " + extraBonus + " added as extra bonus");
                    showrank();
                }
                else if (result == 2)
                {
                    $("#increaseScore span").text("You could not beat your own score. You don't give up. Click replay to try again");
                }
                else
                {
                    alert(result);
                }
            });


            // },2000);

            setTimeout(function () {
                $("#increaseScore").text("Wanna get to top faster? Invite friends and get 50 points for each invite.").slideUp();
            }, 5000);
        } else {
            // No requests sent, you can do whatever you want (like...nothing, and stay on the page).
        }
    }
    document.getElementById('request').onclick = sendreq;
    function sendreq()
    {
        FB.ui({method: 'apprequests',
            message: 'Hey! Come on beat my score in mad vs math'
        }, requestCallback);
    }
}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



	   	 