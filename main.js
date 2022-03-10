song_1="";
song_2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song_status="";


function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Intialized');
}

function preload()
{
    song_1=loadSound("music.mp3");
    song_2=loadSound("music2.mp3");
    song_1.isPlaying();
    song_2.isPlaying();
}

function draw()
{
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    circle(rightWristX,rightWristY,20);

    if(scoreLeftWrist>0.2)
    {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
    }

    if(scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    leftWristY_divide_1000=remove_decimals/1000;
    volume=leftWristY_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist>0.2)
    {
    circle( RightWristX,RightWristY,20);
    InNumberRightWristY=Number(RightWristY);
    remove_decimals=floor(InNumberRightWristY);
    RightWristY_divide_1000=remove_decimals/1000;
    volume=RightWristY_divide_1000*2;
    document.getElementById("volume").innerHTML="Volume= "+volume;
    song.setVolume(volume);
    }
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        
        leftWristX=results[0].pose.leftWris.x;
        leftWristY=results[0].pose.leftWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("leftWristX="+leftWristX + "leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+ rightWristX +"rightWristY="+ rightWristY);
    }
}