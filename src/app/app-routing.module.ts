import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchPageComponent } from './components/launch-page/launch-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import  { LoginSignupComponent } from './components/login-signup/login-signup.component';
import  { ExamsShowComponent } from './components/exams-show/exams-show.component';

const routes: Routes = [
  { path: 'welcome', component: LaunchPageComponent, pathMatch: 'full',},
  { path: 'home', component: HomepageComponent, pathMatch: 'full',},
  { path: 'student/login-signup', component: LoginSignupComponent, pathMatch: 'full',},
  // { path: 'teacher/exams', component: ExamsShowComponent, pathMatch: 'full',},
  { path: 'exams', component: HomepageComponent, pathMatch: 'full',},
  { path: 'studentlist', component: HomepageComponent, pathMatch: 'full',},
  { path: 'myclasses', component: HomepageComponent, pathMatch: 'full',},
  { path: 'teacherlist', component: HomepageComponent, pathMatch: 'full',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
