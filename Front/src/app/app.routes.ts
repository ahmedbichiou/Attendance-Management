import { Routes } from '@angular/router';
import { AbsenceDetailsComponent } from './absence-details/absence-details.component'; // Import the AbsenceDetailsComponent
import { SubjectButtonsComponent } from './subject-buttons/subject-buttons.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { EtudiantsFormComponent } from './etudiants-form/etudiants-form.component';
import { AddAbsenceComponent } from './add-absence/add-absence.component';
import { EditEtudiantComponent } from './edit-etudiant/edit-etudiant.component';
import { ProfesseursFormComponent } from './gestion-professeurs/professeurs-form/professeurs-form.component';
import { EditProfesseurComponent } from './gestion-professeurs/edit-professeur/edit-professeur.component';
import { ListProfComponent } from './gestion-professeurs/list-prof/list-prof.component';
import { AppComponent } from './app.component';
import { HomePageEtudiantComponent } from './home-page/home-page-etudiant/home-page-etudiant.component';
import { HomePageProfComponent } from './home-page/home-page-prof/home-page-prof.component';
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
import { SessionListComponent } from './home-page/home-page-etudiant/pages/session-list/session-list.component';
import { AbsListEtudComponent } from './home-page/home-page-etudiant/pages/abs-list-etud/abs-list-etud.component';
import { ResetPasswordComponent } from './Login-signup/reset-password/reset-password.component';

import { AuthGuard } from './guard/auth.guard';

import { AllEtudiantsComponent } from './all-etudiants/all-etudiants.component';

//bichiou


export const routes: Routes = [

    // { path: '', component: AppComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path:'login', component:LoginComponent},
    { path:'forgot-password', component: ForgotPasswordComponent },
    { path:'reset-password', component: ResetPasswordComponent },
    { path:'register', component:RegisterComponent},
    { path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
    { path: 'absence-details/:id', component: AbsenceDetailsComponent , canActivate: [AuthGuard]}, // Route for AbsenceDetailsComponent with parameter
    { path: 'subject-buttons', component: SubjectButtonsComponent , canActivate: [AuthGuard]}, // Route for AbsenceDetailsComponent with parameter
    { path: 'course-form', component: CourseFormComponent , canActivate: [AuthGuard]}, // Route for AbsenceDetailsComponent with parameter
    { path: 'etudiants-form', component: EtudiantsFormComponent, canActivate: [AuthGuard]},
    { path: 'add-absence/:studentId', component: AddAbsenceComponent, canActivate: [AuthGuard]},
    { path: 'edit-etudiant/:id', component: EditEtudiantComponent , canActivate: [AuthGuard]},
    { path: 'etudiants-form', component: EtudiantsFormComponent, canActivate: [AuthGuard]}, // Route for AbsenceDetailsComponent with parameter
    { path: 'professeurs-form', component: ProfesseursFormComponent, canActivate: [AuthGuard]},
    { path: 'createProfAcc', component: ProfesseursFormComponent , canActivate: [AuthGuard]},
    { path: 'listProfAcc', component: ListProfComponent , canActivate: [AuthGuard]},
    { path: 'editProfcc', component: EditProfesseurComponent , canActivate: [AuthGuard]},
    { path: 'homePageEtud', component: HomePageEtudiantComponent , canActivate: [AuthGuard]},
    { path: 'homePage', component: HomePageProfComponent, canActivate: [AuthGuard]},
    { path: 'groupes', component: GestionGroupesComponent, canActivate: [AuthGuard]},
    { path: 'createGroupe', component: CreateGroupeComponent, canActivate: [AuthGuard]},
    { path: 'matieres', component: ListMatiereComponent, canActivate: [AuthGuard]},
    { path: 'createMatiere', component: CreateCoursComponent, canActivate: [AuthGuard]},

//boj

{ path: 'etudiantsParGroupe', component: EtudiantsParGroupeComponent, canActivate: [AuthGuard]},
{ path: 'selectedEtudiant', component: SlectedEtudiantComponent, canActivate: [AuthGuard]},
{ path: 'profCours', component: ProfCoursComponent, canActivate: [AuthGuard]},
{ path: 'editEtud', component: EditEtudComponent, canActivate: [AuthGuard]},
{ path: 'profCoursGroup', component: ProfCoursGroupComponent, canActivate: [AuthGuard]},
{ path: 'courseSessions', component: CoursSessionsComponent, canActivate: [AuthGuard]},
{ path: 'createSessionForMatiere', component: CreateSessionCoursComponent, canActivate: [AuthGuard]},
{ path: 'allEtudiants', component: AllEtudiantsComponent, canActivate: [AuthGuard]},


//boj
    //bichiou 
    { path: 'groupesprof', component: GroupesComponent , canActivate: [AuthGuard]},
    {path: 'matiers-prof',component:MatiersprofComponent , canActivate: [AuthGuard]},
    { path: 'feuille-absence-prof', component: FeuilleabsenceprofComponent , canActivate: [AuthGuard]},
    { path: 'touts_etudiant', component:ToutsetudiantsComponent , canActivate: [AuthGuard]},
    {path:'detail-absence-prof',component: DetailAbsProfComponent, canActivate: [AuthGuard]},
    {path:'ajouter-absence-prof',component: AjouterAbsProfComponent, canActivate: [AuthGuard]},
    {path:'session-list-etud/:cours',component: SessionListComponent, canActivate: [AuthGuard]},
    {path:'abs-list-etud',component: AbsListEtudComponent, canActivate: [AuthGuard]},
    //bichiou 
    //bichiou 
];



