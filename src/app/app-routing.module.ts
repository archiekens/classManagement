import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'courses', loadChildren: './courses/courses.module#CoursesPageModule' },
  { path: 'courses/:id/attendances', loadChildren: './courses/attendances/attendances.module#AttendancesPageModule' },
  { path: 'courses/:id/students', loadChildren: './courses/students/students.module#StudentsPageModule' },
  { path: 'courses/:id/activities', loadChildren: './courses/activities/activities.module#ActivitiesPageModule' },
  { path: 'courses/:id/grading', loadChildren: './courses/grading/grading.module#GradingPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'students', loadChildren: './students/students.module#StudentsPageModule' },
  { path: 'courses/:id/activities/:id2/results', loadChildren: './courses/activities/results/results.module#ResultsPageModule' },
  { path: 'add-activity', loadChildren: './modals/add-activity/add-activity.module#AddActivityPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
