import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  authors: any[];
  serverUrl: string = 'http://localhost:5000/post/authors';
  sorted: string = ''
  constructor(
    private store: Store<{ isAuthorized: boolean; token: string }>,
    private http: HttpClient,
    private router: Router
  ) {}
  sort(hey) {
    switch (hey.target.innerText.toLowerCase()) {
      case 'title':
        this.authors.sort(this.compareTitleColumn);
        break;
      case 'description':
        this.authors.sort(this.compareDescriptionColumn);
        break;
      case 'id':
        this.authors.sort(this.compareIdColumn);
        break;
      case 'time':
        this.authors.sort(this.compareTimeColumn);
        break;
      case 'author':
        this.authors.sort(this.compareTimeColumn);
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    return this.http.get(this.serverUrl).subscribe((data) => {
      let posts = [];
      for (let i = 0; ; i++) {
        if (data[i] == undefined) break;
        for (let j = 0; j < data[i].posts.length; j++) {
          posts[posts.length] = data[i].posts[j];
          console.log(data[i].posts[j]);
        }
      }
      this.authors = posts;
      console.log(this.authors);
    });
  }
  compareIdColumn(a, b) {
    a.id.toLowerCase()
    b.id.toLowerCase()
    console.log(this.sorted);
    return 0
    // if(this.sorted == "id"){
    //   if (a.id === b.id) {
    //     return a.id < b.id ? -1 : 1;
    //   } else {
    //     return 0;
    //   }
    // } else {
    //   this.sorted = 'id'
    //   if (a.id === b.id) {
    //     return 0;
    //   } else {
    //     return a.id < b.id ? -1 : 1;
    //   }
    // }
    
  }
  compareTitleColumn(a, b) {    
    a.title.toLowerCase()
    b.title.toLowerCase()
    return ('' + a.title).localeCompare(b.title);
  }
  compareDescriptionColumn(a, b) {
    a.description.toLowerCase()
    b.description.toLowerCase()
    if (a.description === b.description) {
      return 0;
    } else {
      return a.description < b.description ? -1 : 1;
    }
  }

  compareTimeColumn(a, b) {
    if (a.time === b.time) {
      return 0;
    } else {
      return a.time < b.time ? -1 : 1;
    }
  }

  compareAuthorColumn(a, b) {
    a.author.toLowerCase()
    b.author.toLowerCase()
    return ('' + a.author).localeCompare(b.author);
  }
}
