import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LaunchPageComponent } from './components/launch-page/launch-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LessonCardComponent } from './components/lesson-card/lesson-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MatTabsModule} from '@angular/material/tabs';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralDialogComponent } from './components/general-dialog/general-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
// import { CdkDialogContainer } from '@angular/cdk/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExamsShowComponent } from './components/exams-show/exams-show.component';
import {MatTableModule} from '@angular/material/table';
import { ExamDisplayIndividualComponent } from './components/exam-display-individual/exam-display-individual.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NewClassComponent } from './components/new-class/new-class.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { VideoCallComponent } from './components/video-call/video-call.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LaunchPageComponent,
    HomepageComponent,
    NavbarComponent,
    HeaderComponent,
    LessonCardComponent,
    LoginSignupComponent,
    GeneralDialogComponent,
    ExamsShowComponent,
    ExamDisplayIndividualComponent,
    UserCardComponent,
    NewClassComponent,
    VideoCallComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    FontAwesomeModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    MatTableModule,
    MatStepperModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule
    // CdkDialogContainer
  ],
  providers: [MatDatepickerModule,FormBuilder,FormControl],
  bootstrap: [AppComponent]
})
export class AppModule { }
