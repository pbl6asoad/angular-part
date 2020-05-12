import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minimaze-profile',
  templateUrl: './minimaze-profile.component.html',
  styleUrls: ['./minimaze-profile.component.css']
})
export class MinimazeProfileComponent implements OnInit {
  name = localStorage.getItem('login')
  constructor() { }

  ngOnInit(): void {
  }

}
