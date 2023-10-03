import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-toturials',
  templateUrl: './mobile-toturials.component.html',
  styleUrls: ['./mobile-toturials.component.css']
})
export class MobileToturialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  playPause() {
    var myVideo: any = document.getElementById('my_video_1');
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }

  makeBig() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 560;
  }

  makeSmall() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 320;
  }

  makeNormal() {
    var myVideo: any = document.getElementById('my_video_1');
    myVideo.width = 420;
  }

  skip(value) {
    let video: any = document.getElementById('my_video_1');
    video.currentTime += value;
  }

  restart() {
    let video: any = document.getElementById('my_video_1');
    video.currentTime = 0;
  }
}
