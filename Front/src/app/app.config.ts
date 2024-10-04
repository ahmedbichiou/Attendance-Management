import { ApplicationConfig } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideHttpClient()]
};



import { DatePipe } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule if needed
import { AbsenceDetailsComponent } from './absence-details/absence-details.component'; // Import the AbsenceDetailsComponent
import { HttpClientModule } from '@angular/common/http';
import { EtudiantService } from './services/etudiant.service';
import { AppComponent } from './app.component';
import { SubjectButtonsComponent } from './subject-buttons/subject-buttons.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { EtudiantsFormComponent } from './etudiants-form/etudiants-form.component';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { AbsenceService } from './services/absence.service';
import { CoursService } from './services/cours.service';
import { ProfesseurService } from './services/professeur.service';
import { ProfesseursFormComponent } from './gestion-professeurs/professeurs-form/professeurs-form.component';
import { EditProfesseurComponent } from './gestion-professeurs/edit-professeur/edit-professeur.component';
import { ListProfComponent } from './gestion-professeurs/list-prof/list-prof.component';
import { GestionGroupesComponent } from './gest-groupe/gestion-groupes/gestion-groupes.component';
import { CreateGroupeComponent } from './gest-groupe/create-groupe/create-groupe.component';
import { ListMatiereComponent } from './gest-matiere/list-matiere/list-matiere.component';
import { CreateCoursComponent } from './gest-matiere/create-cours/create-cours.component';

import { LoginComponent } from './Login-signup/login/login.component';
import { RegisterComponent } from './Login-signup/register/register.component';
import { ForgotPasswordComponent } from './Login-signup/forgot-password/forgot-password.component';
import { ProfileComponent } from './Login-signup/profile/profile.component';
//bichiou
import { GroupesComponent } from './home-page/home-page-prof/pages/groupes/groupes.component';
import { FeuilleabsenceprofComponent } from './home-page/home-page-prof/pages/feuilleabsenceprof/feuilleabsenceprof.component';
import { HomePageEtudiantComponent } from './home-page/home-page-etudiant/home-page-etudiant.component';
import { HomePageProfComponent } from './home-page/home-page-prof/home-page-prof.component';
import { ToutsetudiantsComponent } from './home-page/home-page-prof/pages/toutsetudiants/toutsetudiants.component';
import { MatiersprofComponent } from './home-page/home-page-prof/pages/matiersprof/matiersprof.component';
import { DetailAbsProfComponent } from './home-page/home-page-prof/pages/detail-abs-prof/detail-abs-prof.component';
import { AjouterAbsProfComponent } from './home-page/home-page-prof/pages/ajouter-abs-prof/ajouter-abs-prof.component';
import { EtudiantsParGroupeComponent } from './gest-groupe/etudiants-par-groupe/etudiants-par-groupe.component';
import { SlectedEtudiantComponent } from './gest-groupe/slected-etudiant/slected-etudiant.component';
import { ProfCoursComponent } from './gestion-professeurs/prof-cours/prof-cours.component';
import { EditEtudComponent } from './gest-groupe/edit-etud/edit-etud.component';
import { ProfCoursGroupComponent } from './gest-groupe/prof-cours-group/prof-cours-group.component';
import { CoursSessionsComponent } from './gest-matiere/cours-sessions/cours-sessions.component';
import { CreateSessionCoursComponent } from './gest-matiere/create-session-cours/create-session-cours.component';
import { AbsListEtudComponent } from './home-page/home-page-etudiant/pages/abs-list-etud/abs-list-etud.component';
import { SessionListComponent } from './home-page/home-page-etudiant/pages/session-list/session-list.component';
import { ResetPasswordComponent } from './Login-signup/reset-password/reset-password.component';
import { AllEtudiantsComponent } from './all-etudiants/all-etudiants.component';
//bichiou

@NgModule({
  declarations: [
    AbsenceDetailsComponent,
    SubjectButtonsComponent,
    CourseFormComponent,
    EtudiantsFormComponent,
    AddAbsenceComponent,
    EtudiantsFormComponent,
    ProfesseursFormComponent,
    ListProfComponent,
    EditProfesseurComponent,
    GestionGroupesComponent,
    CreateGroupeComponent,
    ListMatiereComponent,
    CreateCoursComponent,

    //boj
    EtudiantsParGroupeComponent,
    SlectedEtudiantComponent,
    ProfCoursComponent,
    EditEtudComponent,
    ProfCoursGroupComponent,
    CoursSessionsComponent,
    CreateSessionCoursComponent,
    AllEtudiantsComponent,
    //boj
    
   
    
    //bichiou
    HomePageProfComponent,
    HomePageEtudiantComponent,
    SessionListComponent,
    AjouterAbsProfComponent,
    GroupesComponent,
    FeuilleabsenceprofComponent,
    MatiersprofComponent ,
    ToutsetudiantsComponent,
    DetailAbsProfComponent,
    AbsListEtudComponent,
    //bichiou
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule, // Import CommonModule
    FormsModule, // Import MatCardModule here
    
    //bichiou
    ReactiveFormsModule,
     //bichiou
    FormsModule, // Import MatCardModule here
    RouterModule.forRoot(routes)
  ],
  providers: [
    DatePipe, // Add DatePipe to the providers array
   EtudiantService,
   AbsenceService,
   CoursService,
   ProfesseurService 
  ],
 
 
})
export class AppModule { }