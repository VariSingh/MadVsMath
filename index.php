<html>
<head>
<title>mad vs math</title>

<style>
.progressBar{
	width: 300px;
	height: 20px;
	position: absolute;
	top: 296px;
	left: 198px;
	border: 1px solid #ffffff;
}
.progressbarInner{
	width:0%;
	height:100%;
	background:#ffffff;
}
#candybox{

        display: none;
        width: 480px;
        top: 283px;
        height: 60px;
        text-align: center;
        font-size: 45;
        border: 2px solid;
        left: 102px;
        position: absolute;
}

.imgcontainer{
	border: 3px solid #1054F6;
	float:left;
	margin-top:8px;
	border-radius: 59px;
	-webkit-border-radius:59px;
	-moz-border-radius:59px;
	overflow: hidden;
}
#replay{
	cursor: pointer;
	box-shadow: 0px 10px 48px #ECB4EE;
	background: none repeat scroll 0 0 #ffc1c1;
    border: 8px solid #c74c06;
    border-radius: 11px;
	-webkit-border-radius:11px;
	-moz-border-radius:11px;
    font-size: 31px;
    height: 39px;
    left: 100px;
    padding-top: 0;
    position: absolute;
    text-align: center;
    top: 399px;
    width: 204px;
}
#replay:hover{
	box-shadow: 0px 10px 48px #FFFFFF;
}
#invtfrnds{
	box-shadow: 0px 10px 48px #ECB4EE;
	background: none repeat scroll 0 0 #ffc1c1;
    border: 8px solid #c74c06;
    border-radius: 11px;
	-webkit-border-radius:11px;
	-moz-border-radius:11px;
    font-size: 31px;
    height: 39px;
    left: 373px;
    padding-top: 0;
    position: absolute;
    text-align: center;
    top: 399px;
    width: 204px;
	cursor: pointer;
}
#invtfrnds:hover{
	box-shadow: 0px 10px 48px #FFFFFF;
}
body{
	background-image: url('images/background.jpg');
	width:100%;
	height:100%;
}
#timeupmessage{
	display: none;
	position: absolute;
	width: 325px;
	font-size: 81;
	border-radius: 33px;
	-webkit-border-radius:33px;
	-moz-border-radius:33px;
	height: 100px;
	top: 184px;
	box-shadow: 4px 34px 68px #000000;
	left: 158px;
	text-align: center;
	background: #00FFF5;
	z-index: 9;
	border: 25px solid #ffffff;
}
#practiceContainer11{
	display: none;
	position: absolute;
	width:700px;
	height:500px;
	font-size: 40;
	border-radius: 33px;
	-webkit-border-radius:33px;
	-moz-border-radius:33px;
	top: 0px;
	box-shadow: 4px 34px 68px #000000;
	left: 0px;
	text-align: center;
	background: #00FFF5;
	z-index: 9;
	border: 25px solid #ffffff;
}
#candy{
	opacity:0;
	position: absolute;
	top: 331px;
	color: #ffffff;
	left: 373px;
	font-size: 55;
	width: 110px;
	/* border: 1px solid; */
	float: right;
	z-index: 9;
	background-position: 24px 51px;
	background-repeat: no-repeat;
	height: 120px;
	background-image: url('images/candyicon.png');
}

#timeralert{
	display:none;
	width: 199px;
	border-radius: 12px;
	-webkit-border-radius:12px;
	-moz-border-radius:12px;
	border: 6px solid #FF5E5E;
	position: absolute;
	left: 316px;
	background: #0EBCFF;
	top: 134px;
	padding-top: 8px;
	text-align: center;
	height: 32px;
	z-index: 9;
}
#cheatalert{
	display: none;
	width: 199px;
	border-radius: 12px;
	-webkit-border-radius:12px;
	-moz-border-radius:12px;
	border: 6px solid #FF5E5E;
	position: absolute;
	left: 316px;
	background: #0EBCFF;
	top: 246px;
	padding-top: 8px;
	text-align: center;
	height: 32px;
	z-index: 9;
}
#stoptimer{
	cursor: pointer;
	-ms-transform: rotate(10deg); /* IE 9 */
	-webkit-transform: rotate(10deg); /* Chrome, Safari, Opera */
	transform: rotate(10deg);
	color: #FF0000;
	font-weight: bold;
	position: absolute;
	top: 30px;
	left: -117px;
	height: 70px;
	text-align: center;
	width: 70px;
	font-size: 24;
	border: 15px solid #D30F17;
	background:#ffffff;
	border-radius: 37px;
	-moz-border-radius: 37px;
	-webkit-border-radius: 37px;
	
}
#stoptimer:hover{
color:#7C0707;
border-color:#7C0707;
}
#cheat{
	cursor: pointer;
	background:#ffffff;
	-ms-transform: rotate(350deg); /* IE 9 */
	-webkit-transform: rotate(350deg); /* Chrome, Safari, Opera */
	transform: rotate(350deg);
	color: #056EF3;
	font-weight: bold;
	position: absolute;
	top: 148px;
	left: -117px;
	border-radius: 35px;
	-moz-border-radius: 35px;
	-webkit-border-radius: 35px;
	padding-top: 16px;
	height: 48px;
	text-align: center;
	width: 70px;
	font-size: 24;
	border: 15px solid #056EF3;
}
#cheat:hover{
color:#002D66;
border-color:#002D66;
}
#request{
	cursor: pointer;
	background:#ffffff;
	-ms-transform: rotate(6deg); /* IE 9 */
	-webkit-transform: rotate(6deg); /* Chrome, Safari, Opera */
	transform: rotate(6deg);
	color: #06B13C;
	font-weight: bold;
	position: absolute;
	top: 260px;
	left: -117px;
	height: 70px;
	text-align: center;
	width: 70px;
	border-radius: 38px;
	-moz-border-radius: 38px;
	-webkit-border-radius: 38px;
	font-size: 24;
	border: 15px solid #06B13C;
}
#quit{
	cursor: pointer;
	background:#ffffff;
	-ms-transform: rotate(-27deg); /* IE 9 */
	-webkit-transform: rotate(-27deg); /* Chrome, Safari, Opera */
	transform: rotate(-27deg);
	color: #FF6B00;
	font-weight: bold;
	position: absolute;
	top: 380px;
	padding-top:17px;
	left: -117px;
	height: 53px;
	text-align: center;
	width: 70px;
	border-radius: 38px;
	-moz-border-radius: 38px;
	-webkit-border-radius: 38px;
	font-size: 24;
	border: 15px solid #FF6B00;
}
#quit:hover{
	color:#A94700;
	border-color:#A94700;
}
#request:hover{
	color:#056924;
	border-color:#056924;
}
#showlevel{
position: absolute;
top: 100px;
left: 210px;
font-size: 71px;
width: 279px;
padding-top: 6px;
text-align: center;
height: 95px;
border: 3px solid;
z-index: 1;
display:none;
}
#levelslide{
position:absolute;
top: 186px;
left: 203px;
font-size: 71px;
width: 279px;
padding-top: 6px;
text-align: center;
height: 95px;
border: 3px solid;
z-index: 1;
border: 5px solid;
display: none;
}
#level{
position: absolute;
top: 111px;
width: 208px;
left: 241px;
color: #ffffff;
font-size: 42px;
text-align: center;
height: 56px;
}
#score{
position: absolute;
top: 110px;
left: 508px;
color: #ffffff;
font-size: 30;
}
#coins{
position: absolute;
top: 162px;
left: 508px;
color: #ffffff;
font-size: 30;
}
.container{
position:relative;
width:700px;
height:500px;
background: #cccccc;
background-size:100%;
margin: 0 auto;
background-image: url('images/splashscreen.png');
box-shadow: -1px 48px 63px #000000;
}
.rankdim{
	font-size: 15px;
	width: 163px;
	height: 64px;
	position: absolute;
	background: -webkit-linear-gradient(rgb(249, 110, 236),rgb(248, 255, 255));
	background: -o-linear-gradient(rgb(249, 110, 236),rgb(248, 255, 255));
	background: -moz-linear-gradient(rgb(249, 110, 236), rgb(248, 255, 255));
	background: linear-gradient(rgb(249, 110, 236), rgb(248, 255, 255));
	left: 600px;
	border-radius: 15px;
	-webkit-border-radius:15px;
	-moz-border-radius:15px;
	border: 6px solid #00C6FF;
	box-shadow: 11px 16px 11px #000000;
}
#rank1{
top: -90px;
display:none;
}
#rank2{
top: -11px;
display:none;
}
#rank3{
top: 70px;
display:none;
}
#rank4{
top: 153px;
display:none;
}
#rank5{
top: 237px;
display:none;
}
#rank6{
top: 320px;
display:none;
}
#rank7{
left :463px;
top:397px;
display:none;
}

#loading{
width: 100%;
height: 100%;
color: #ffffff;
font-size: 50;
display:none;
}
.dimentions{
width:100%;
height:100%;
display:none;
}
#splash{
background-image: url('images/splashscreen.png');
background-size:100%;
}
.mvmbutton{
font-family: Arial;
text-shadow: 1px -1px 0px #000000;
background:#58B402;
border-radius: 13px;
-webkit-border-radius:13px;
	-moz-border-radius:13px;
border: 5px solid #FF7B00;
text-align: center;
left: 231px;
top: 395px;
box-shadow: -1px 14px 32px #000000;
position: absolute;
width: 236px;
height: 50px;
font-size: 41px;
z-index: 99;
}
#practice_button{
display:none;
font-family: Arial;
text-shadow: 1px -1px 0px #000000;
background:#58B402;
border-radius: 13px;
border: 5px solid #FF7B00;
text-align: center;
left: 231px;
top: 139px;
box-shadow: -1px 14px 32px #000000;
position: absolute;
width: 236px;
height: 50px;
font-size: 41px;
z-index: 3;
}
#practice_button:hover{
background:#cccccc ;
}
#classic_button{
	cursor: pointer;
	font-family: Arial;
	text-shadow: 1px -1px 0px #000000;
	background: #00FFF5;
	text-align: center;
	border: 5px solid #FF7B00;
	left: 231px;
	top: 215px;
	position: absolute;
	width: 236px;
	height: 50px;
	border-radius: 13px;
	-webkit-border-radius:13px;
	-moz-border-radius:13px;
	text-align: center;
	box-shadow: -1px 14px 32px #000000;
	font-size: 41px;
	z-index: 3;
}
#classic_button:hover{
	background:#cccccc ;
}
#easy_button{
	border: #ffffff 1px solid;
	color: #ffffff;
	position: absolute;
	left: 99px;
	top: 210px;
	width: 150px;
	height: 63px;
	text-align: center;
	padding: 10px 0;
	font-size: 40;
	background-size: contain;
}
#easy_button:hover{
background:#ffffff;
color:#0a3e31;
}
#medium_button{
border: #ffffff 1px solid;
color: #ffffff;
position: absolute;
left: 274px;
top: 210px;
width: 150px;
font-size: 40;
height: 55px;
text-align: center;
padding: 15px 0;
}
#medium_button:hover{
background:#ffffff;
color:#0a3e31;
}
#hard_button{
border: #ffffff 1px solid;
color: #ffffff;
position: absolute;
left: 448px;
top: 210px;
font-size: 40;
width: 150px;
height: 52px;
text-align: center;
padding: 17px 0;
}
#hard_button:hover{
background:#ffffff;
color:#0a3e31;
}
.timer{
left: 180px;
top: 33px;
text-align: center;
width: 193px;
font-size: 43;
padding: 4px 64px;
height: 55px;
background-image:url('images/countthreebackground.png');
position: absolute;
font-weight: bold;
border: #8f4d12 4px solid;
}
#answer{
/* width: 268px; */
height: 50px;
top: 356px;
font-size: 42;
text-align: center;
position: absolute;
left: 108px;
border: #571A02 5px solid;
}
.question_container{
	position: absolute;
	width: 300px;
	height: 86px;
	top: 174px;
	left: 198px;
	padding: 17px 0;
	background: none;
	font-weight: bold;
	text-align: center;
	border: #ffffff 1px solid;
}
.question{
	display: inline-block;
	color:#ffffff;
	font-size: 69;
	margin: 0 auto;
}
textarea:focus, input:focus{
    outline: 0;
}
#count_three_container{
	display:none;
	width:100%;
	height:100%;
	background-image:url('images/countthreebackground.png');
}
#continueLevel{
	display: none;
	background: #F1CA2C;
	width: 406px;
	height: 336px;
	top: 53px;
	border: 5px solid #EBE55E;
	left: 144px;
	text-align: center;
	position: absolute;
	box-shadow: 0px 10px 48px #000000;
	font-size: 35px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
}
.continueButton{
	background: none repeat scroll 0 0 #ffc1c1;
	border: 8px solid #c74c06;
	border-radius: 11px;
	-webkit-border-radius:11px;
	-moz-border-radius:11px;
	font-size: 31px;
	height: 39px;
	left: 88px;
	padding-top: 0;
	box-shadow: 0px 10px 48px #ECB4EE;
	position: absolute;
	text-align: center;
	top: 190px;
	cursor: pointer;
	width: 204px;
}
.continueButton:hover{
	box-shadow: 0px 10px 48px #FFFFFF;
}
#message_container{
display:none;
width:100%;
height:100%;
background-image:url('images/countthreebackground.png');
}
#gameover{
	position: absolute;
	top: 16px;
	left: 102px;
	width: 480px;
	height: 80px;
	font-size: 64;
	text-align: center;
	padding-top: 2px;
	font-weight: bold;
	border: 2px solid;
}
#mistakes{
	display: none;
	position: absolute;
	width: 481px;
	height: 57px;
	left: 102px;
	font-size: 41;
	top: 116px;
	padding: 5px 0;
	text-align: center;
	border: 2px solid;
}
#totaltimetaken{
	display: none;
	position: absolute;
	width: 480px;
	height: 55px;
	top: 202px;
	font-size: 44;
	text-align: center;
	left: 102px;
	padding: 3px 0;
	border: 2px solid;
}
.countboxes{
opacity:0;
position: absolute;
width: 200px;
height: 250px;
left: 241px;
top: -79px;
text-align: center;
border: 1px solid;
font-size: 231;
}
.message{
position: absolute;
left: 51px;
top: 33px;
font-size: 21;
}
#back{
display:none;
position: absolute;
width: 100px;
height: 50px;
top: 35px;
left: 32px;
background: url(images/sprites.png) no-repeat -6px -422px;
}
#back:hover{
background-position: -116px -424px ;
}
#rankcontainer{
background-image:url('images/countthreebackground.png');
}
#ranktext{
position: absolute;
width: 312px;
height: 211px;
text-align: center;
left: 228px;
top: 100px;
font-size: 49;
}
#rank{
position: absolute;
left: 100px;
top: 100px;
font-size: 22;
text-align: center;
width: 300px;
height: 100px;
}
#mad{
display:none;
position:absolute;
top: 32px;
left: 111px;
width:501px;
height:201px;
background:url('images/mad.png');
}
#vs{
display:none;
position:absolute;
top: 212px;
left: 256px;
width:176px;
height:110px;
background:url('images/vs.png');
}
#math{
display:none;
position:absolute;
top: 232px;
left: 63px;
width:589px;
height:232px;
background:url('images/math.png') no-repeat;
}
#progresschart{
display:none;
width: 156px;
height: 48px;
top: 434px;
left: 174px;
border: 1px solid;
position: absolute;
text-align: center;
font-size: 17;
}

#worldrank{
display:none;
width: 156px;
height: 48px;
top: 434px;
left: 376px;
border: 1px solid;
position: absolute;
text-align: center;
font-size: 17;
}
.inviteFriends{
	background: none repeat scroll 0 0 #ffc1c1;
	border: 8px solid #c74c06;
	border-radius: 11px;
	-webkit-border-radius:11px;
	-moz-border-radius:11px;
	font-size: 31px;
	height: 39px;
	left: 88px;
	padding-top: 0;
	box-shadow: 0px 10px 48px #ECB4EE;
	position: absolute;
	text-align: center;
	top: 190px;
	cursor: pointer;
	width: 204px;
}
.inviteFriends:hover{
	box-shadow: 0px 10px 48px #FFFFFF;
}
#increaseScore{
	display:none;
	background: #F1CA2C;
	width: 406px;
	height: 300px;
	top: 23px;
	border: 5px solid #EBE55E;
	left: 134px;
	text-align: center;
	position: absolute;
	box-shadow: 0px 10px 48px #000000;
	font-size: 35px;
	border-radius: 10px;
	-webkit-border-radius:10px;
	-moz-border-radius:10px;
}
#quitMessage{
	display: none; 
	background: #F1CA2C;
	width: 306px;
	height: 136px;
	top: 53px;
	border: 5px solid #EBE55E;
	left: 194px;
	text-align: center;
	position: absolute;
	box-shadow: 0px 10px 48px #000000;
	font-size: 35px;
	z-index:999999999;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
}
.YesQuit{
	left: 18px;
	top: 78px;
	width: 94px;
}
.NoQuit{
	left: 179px;
	top: 77px;
	width: 94px;
}
.buttonStyle{
	background: none repeat scroll 0 0 #ffc1c1;
	border: 8px solid #c74c06;
	border-radius: 11px;
	-webkit-border-radius:11px;
	-moz-border-radius:11px;
	font-size: 31px;
	height: 39px;
	padding-top: 0;
	box-shadow: 0px 10px 48px #ECB4EE;
	position: absolute;
	text-align: center;
	cursor: pointer;
}
</style>
<script type="text/javascript" src="jquery.min.js"></script>
<!--<script type="text/javascript" src="jquery.knob.js"></script>-->
<script type="text/javascript" src="codeplugin.js"></script>
</head>
<body>
<div id="timeralert"></div>
<div id="cheatalert"></div>
<div id="loading">Loading...</div>
<div class="container">
<div id="stoptimer">stop timer</div>
<div id="cheat">cheat</div>
<div id="request">Invite friends</div>
<div id="quit">Quit</div>
<div id="rankcontainer" class="dimentions">
<div id="ranktext">Your rank is:</div>
</div>
<div id="timeupmessage">Time Up</div>
<div id="practiceContainer11">
<h3>Congratulations!</h3>
You completed level 10. Feeling smart?We got a twist for you.
From now on all symbols will have reverse meaning. This means, (*) means (/) and (-) means (+) and vice versa.
<div class="mvmbutton" id="continue">Continue</div>

</div>
<span id="mad"></span>
<span id="vs"></span>
<span id="math"></span>
<div id="splash" class="dimentions"></div>
<div id="count_three_container">
<div id="levelslide">Level 1</div> 
<div id="showlevel"></div>
<span id="countthree" class="countboxes">3</span>
<span id="counttwo" class="countboxes">2</span>
<span id="countone" class="countboxes">1</span>
</div>
<div id="message_container">
<div id="candybox"></div>
<div id="gameover">GAME OVER</div>
<div id="mistakes">mistakes: 88 x 5seconds</div>
<div id="totaltimetaken">Total time: 88:88:88</div>
<div id="replay" onClick="startgame();">Replay</div>
<div id="invtfrnds">Invite Friends</div>
<div id="increaseScore"><span>Wanna get to top faster? Invite friends and get 10 points for each invite.</span><div  class="inviteFriends">Invite Friends</div><div></div></div>
</div>
<div id="message_container1"></div>
<div id="practice_classic" class="dimentions">
<div id="practice_button">PRACTICE</div>
<div  id="classic_button">PLAY</div>
</div>
<div id="difficultycontainer" class="dimentions">
<div id="easy_button">Easy</div>
<div id="medium_button">Medium</div>
<div id="hard_button">Hard</div>
</div>
<div id="practicecontainer" class="dimentions">
<div id="level">level</div>
<div id="coins">candies</div>
<div id="score">score</div>
<div class="timer"><span id="cd_m">00</span>:
    <span id="cd_s">00</span>:
    <span id="cd_ms">00</span></div>
<div class="question_container">
<div class="question">1x1</div>
</div>
<div class="progressBar"><div class="progressbarInner"></div></div>
<div class="answercontainer"><input type="text" id="answer"/></div>
<div id="continueLevel">Superb Job! Now move to next level
<div class="continueButton">Next</div>
</div>
<div id="quitMessage">Do you really wanna quit? <div class="YesQuit buttonStyle">Yes</div><div class="NoQuit buttonStyle">No</div></div>
</div>
<div id="classic" class="dimentions">
<input type="button" id="singleplayer_button" />
<input type="button" id="multiplayer_button" />
</div>
<div id="singleplayercontainer" />
<div id="multiplayercontainer" />
<div id="rank">
<div id="rank1" class="rankdim"></div>
<div id="rank2" class="rankdim"></div>
<div id="rank3" class="rankdim"></div>
<div id="rank4" class="rankdim"></div>
<div id="rank5" class="rankdim"></div>
<div id="rank6" class="rankdim"></div>
<div id="rank7" class="rankdim"></div>
</div>
</div>
<div style="position:absolute;top:-1000px;">
 
  
    <input type="button" value="Start" id="cd_start" />
    <input type="button" value="Pause" id="cd_pause" />
    <input type="button" value="Stop"  id="cd_stop" />
    <input type="button" value="Reset" id="cd_reset" />
    <br/>
    <br/>
    <input type="text" value="60" id="cd_seconds" />
    secs
    <br/>
    <br/>
    <span id="cd_status">Idle</span>
</div>
<!--<input type="text" value="75" class="dial">-->
</body>
</html>