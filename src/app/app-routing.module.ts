import { AuthorsComponent } from './authors/authors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'post/create', component: PostCreateComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
