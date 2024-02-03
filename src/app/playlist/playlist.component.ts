import { Component, OnInit } from '@angular/core';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { ChangeDetectorRef } from '@angular/core';
import { PlaylistService } from '../service/playlist.service';

const { S3Client, ListObjectsCommand } = require ("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  public AWS_REGION="ap-south-1"
  private AWS_ACCESS_KEY_ID="AKIAXWYQCR4WRAEMBJFR"
  private AWS_SECRET_ACCESS_KEY="OfGWxoNoAjkyNaLYLnGQzw62QbB22+Jz77jmJ0RY"
  private BUCKET="dummyfortestproject"
  url?: string;
  mp3Objects: any[] = [];
  selectedValue: string = '';

  s3 = new S3Client({
    region: this.AWS_REGION,
    credentials: {
        accessKeyId: this.AWS_ACCESS_KEY_ID,
        secretAccessKey: this.AWS_SECRET_ACCESS_KEY
    }
  })

  constructor(private playlistService: PlaylistService) { 
    this.makeConnection();
    this.playlistService.getSong.subscribe(song => this.selectedValue = song);
  }

  ngOnInit(): void {
  }

  async makeConnection(){
    if (!this.BUCKET) {
      console.log("Bucket not available");
    } else {
      const res = await this.s3.send(new ListObjectsCommand({ Bucket: this.BUCKET }));
      this.mp3Objects = res.Contents;
      console.log(this.mp3Objects);
    }
  }

  async getObjectURL(key?: string){
    if(!key){
      alert("no key");
      return;
    }
    const command = new GetObjectCommand(
      {
        Bucket:this.BUCKET,
        Key: key
      }
    )
    this.url = await getSignedUrl(this.s3, command);
    console.log(this.url);
  }

  updateSong(){
    this.playlistService.setSong(this.selectedValue);
  }
}
