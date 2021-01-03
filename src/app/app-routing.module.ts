import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {CreateAssessmentComponent} from './create-assessment/create-assessment.component';
import {EditAssessmentComponent} from './edit-assessment/edit-assessment.component';
import {AssessmentComponent} from './assessment/assessment.component';
import { SubmissionComponent } from './submission/submission.component';
import { AnswerComponent } from './submission/answer/answer.component';

const route: Routes = [
  {path: 'create-assessment' , pathMatch: 'full', component:   CreateAssessmentComponent},
  {path: 'create-assessment/:assessmentID/edit' , component: EditAssessmentComponent },
  {path: 'assessment/:assessmentID' , component: AssessmentComponent},
  {path: 'assessment/:assessmentID/submission' , component: SubmissionComponent},
  {path: 'answer', component : AnswerComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
