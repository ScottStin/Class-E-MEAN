import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchPageComponent } from './components/launch-page/launch-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import  { LoginSignupComponent } from './components/login-signup/login-signup.component';
import  { ExamsShowComponent } from './components/exams-show/exams-show.component';
import  { VideoCallComponent } from './components/video-call/video-call.component';
import { VideoCallV2Component } from './components/video-call-v2/video-call-v2.component';

const routes: Routes = [
  { path: 'welcome', component: LaunchPageComponent, pathMatch: 'full',},
  { path: 'home', component: HomepageComponent, pathMatch: 'full',},
  { path: 'student/login-signup', component: LoginSignupComponent, pathMatch: 'full',},
  { path: 'teacher/login-signup', component: LoginSignupComponent, pathMatch: 'full',},
  // { path: 'teacher/exams', component: ExamsShowComponent, pathMatch: 'full',},
  { path: 'exams', component: HomepageComponent, pathMatch: 'full',},
  { path: 'studentlist', component: HomepageComponent, pathMatch: 'full',},
  { path: 'myclasses', component: HomepageComponent, pathMatch: 'full',},
  { path: 'teacherlist', component: HomepageComponent, pathMatch: 'full',},
  { path: 'lessonvideo', component: VideoCallComponent, pathMatch: 'full',},
  { path: 'lesson/:id', component: VideoCallV2Component},
  { path: 'packages', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
