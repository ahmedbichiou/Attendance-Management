import { Component, Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/User';
import { AuthService } from './services/Auth/auth.service';
import { TokenStorageService } from './services/Auth/token-storage.service';

//new 
import { isPlatformBrowser } from '@angular/common';
import { EtudiantService } from './services/etudiant.service';
import { Etudiant } from './models/Etudiant';
import { ProfesseurService } from './services/professeur.service';
import { Professeur } from './models/Professeur';
import {ProfessorManageService} from './services/managment/professor-manage.service'
import {EtudiantManageService} from './services/managment/etudiant-manage.service'
//new
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isAttendanceSheetActive: boolean = false;
  isprofesseurActive : boolean = false;
  isSubjectsActive: boolean = false;
  isAddSubjectsActive: boolean = false;
  isEtudiantsFormActive: boolean = false;
  isetudiantActive : boolean = false;
  isgroupeActive : boolean = false;
  isCollapsed: boolean = false;
  title = 'gestionabsences';


   //new
  users: User[]= [];
  user: User | null = null;
  token: any | null = null; 
  private isBrowser: boolean;
  students: Etudiant[] = [];
  PROFESSEURLOGIN: Professeur | undefined;
  ETUDIANTLOGIN: Etudiant | null = null;
  userIdToFind: number | null = null; // Replace X with the userId you want to find
 //new

IsProfesseurLoggedin : boolean = false;
IsAdminLoggedin : boolean = false;
IsEtudiantLoggedin : boolean = false;


  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    //new 
    private userService: UserService,
    private authService: AuthService,
    private ProfessorManageService: ProfessorManageService,
    private EtudiantManageService: EtudiantManageService,
    private tokenStorageService: TokenStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private etudiantService: EtudiantService,
    private professeurService: ProfesseurService,

  //new
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  
  ngOnInit(): void {

    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveState();

       
        if (this.isBrowser) {
          const storedUser = localStorage.getItem('currentUser');
          const currentUser = storedUser ? JSON.parse(storedUser) : null;
          const token = currentUser ? currentUser.token : null;
      
          if (token) {
            const trimmedToken = token.trim(); // Remove any potential whitespace
           
            this.authService.getProfile(`Bearer ${trimmedToken}`).subscribe({
              next: (response) => {
                this.user = response;
               
                if(this.user?.role == "ÉTUDIANT")
                  {
                    this.fetchAllStudents();
                    setTimeout(() => {
                    this.ETUDIANTLOGIN = this.students[0];
                    this.setCurrentEtudiant(this.ETUDIANTLOGIN);
                  }, 100);
                    this.IsEtudiantLoggedin  = true;
                    this.IsProfesseurLoggedin  = false;
                    this.IsAdminLoggedin  = false;
                  } else  if(this.user?.role == "PROFESSEUR")
                  {
                    this.fetchProfessorByUserId();
                      setTimeout(() => {
                        if(this.PROFESSEURLOGIN != null)
                        this.setProfessor(this.PROFESSEURLOGIN);
                      }, 100);
                    this.IsProfesseurLoggedin  = true;
                    this.IsEtudiantLoggedin  = false;
                    this.IsAdminLoggedin  = false;
              
                  }else if (this.user?.role == "ADMINISTRATEUR"){
                    this.IsProfesseurLoggedin  = false;
                    this.IsEtudiantLoggedin  = false;
                    this.IsAdminLoggedin  = true;
                  }
            },
              error: (error) => console.error('There was an error!', error)
            });
          }
        }
       
      }
    });
    this.updateActiveState();

    //new
   

    

  
     //new
    
  }



//new

setProfessor(professor: Professeur): void {

  this.ProfessorManageService.setCurrentProfessor(professor);
}

setCurrentEtudiant(etudiant: Etudiant): void {
  this.EtudiantManageService.setCurrentEtudiant(etudiant);
}



getProfessor(): Professeur | undefined {
 
  return this.ProfessorManageService.getCurrentProfessor();
}




fetchAllStudents(): void {
  this.etudiantService.getAllEtudiants().subscribe(
    (students: Etudiant[]) => {
      this.students = students;
      this.filterStudentsByUserId();
    },
    (error) => {
      console.error('Error fetching students:', error);
      // Handle error, maybe show an error message
    }
  );
}
gotohomepageetud()
  {
    this.router.navigate(['/homePageEtud']);
  }
filterStudentsByUserId(): void {
  // Filter students based on userId
  this.students = this.students.filter(student => student.idUser === this.user?.idUser);

}

fetchProfessorByUserId(): void {
  this.professeurService.getAllProfesseurs().subscribe(
    (professors: Professeur[]) => {
      this.PROFESSEURLOGIN = professors.find(prof => prof.idUser === this.user?.idUser);
    
    },
    (error) => {
      console.error('Error fetching professors:', error);
      // Handle error, maybe show an error message
    }
  );
}


//new



  goTosubjects() {
    this.router.navigate(['/matieres']);

  }



  gotogroupes()
  {
    this.router.navigate(['/groupes']);

  }
  gotoprofesseurs()
  {
    this.router.navigate(['/listProfAcc']);

  }

  gotohomeprofesseur(){
    this.router.navigate(['/homePageProf']);
  }

  gotohomeetudiant(){
    this.router.navigate(['/homePageEtud']);
  }
  gotolistetudiant(){
    this.router.navigate(['/touts_etudiant']);
  }
  gotolistegroupeprof()
  {
    this.router.navigate(['/groupesprof']);
  }
  gotoetudiants(){
    this.router.navigate(['/allEtudiants']);
  }
  gotoprofile()
  {
    this.router.navigate(['/profile']);
  }
  logout(): void {
    this.authService.logout();
    // Optionally navigate to a different page after logout
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  updateActiveState(): void {
    this.isAttendanceSheetActive = this.router.url.includes('attendance-sheet');
    this.isSubjectsActive = this.router.url.includes('subject-buttons');
    this.isAddSubjectsActive = this.router.url.includes('course-form');
    this.isEtudiantsFormActive = this.router.url.includes('etudiants-form');
    this.isgroupeActive = this.router.url.includes('groupes');
    this.isprofesseurActive = this.router.url.includes('professeurs');
    this.loginActive = this.router.url.includes('login');
    this.profileActive = this.router.url.includes('profile');
    this.forgotpasswordActive = this.router.url.includes('forgot-password');
    this.isregister = this.router.url.includes('register');
    this.resetPasswordActive = this.router.url.includes('reset-password');
    
    if(this.profileActive  || this.forgotpasswordActive  ||  this.loginActive || this.isregister || this.resetPasswordActive)
      {
        this.ishidden = true;
      }
      else{
        this.ishidden = false;
      }
  
  }


ishidden:boolean= false;
isregister:boolean= false;
forgotpasswordActive :boolean= false;
profileActive :boolean =  false;
loginActive : boolean = false;
resetPasswordActive: boolean= false;
}