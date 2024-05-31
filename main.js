song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
songStatus_peter_pan = "";
songStatus_harry_potter = "";

name1 = "Peter Pan- I am a lost boy"
name2 = "Harry potter theme song"


function preload(){
    song2 = loadSound("Harry-Potter-Theme.mp3");
    song1 = loadSound("Prinz-Peter-pan.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses );
}

function modelLoaded() {
    console.log("Model is initialized");
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results)
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist+ "  scoreRightWrist = "+ scoreRightWrist);    

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX+ "   leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+ "   rightWristY = "+rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 530);

    fill("#FF0000");
    stroke("#FF0000");


    songStatus_peter_pan = song1.isPlaying();
    console.log(songStatus_peter_pan);

    songStatus_harry_potter = song2.isPlaying();
    console.log(songStatus_harry_potter);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(songStatus_peter_pan == false)
        {
            song1.play();
        }
        else
        {
            console.log("Song name: Peter Pan Song");
            document.getElementById("song_name").innerHTML = "Song name: Peter Pan Song";
        }
    }

       
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(songStatus_harry_potter == false)
        {
            song2.play();
        }
        else
        {
            console.log("Song name: Harry potter theme Song");
            document.getElementById("song_name").innerHTML = "Song name: Harry potter theme Song";
        }
    }
    

}

