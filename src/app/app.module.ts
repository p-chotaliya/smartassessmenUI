import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';

import { CKEditorModule } from 'ckeditor4-angular';
// services
import {CreateAssessmentService} from './services/create-assessment.service';
import { AddAssessmentDetailsComponent } from './add-assessment-details/add-assessment-details.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { EditAssessmentComponent } from './edit-assessment/edit-assessment.component';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AssessmentComponent } from './assessment/assessment.component';
import { SubmissionComponent } from './submission/submission.component';
import { AnswerComponent } from './submission/answer/answer.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateAssessmentComponent,
    AddAssessmentDetailsComponent,
    EditAssessmentComponent,
    AddQuestionDialogComponent,
    AssessmentComponent,
    SubmissionComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule,
    CKEditorModule,
    MatBadgeModule,
    ClipboardModule,
    MatTooltipModule
  ],
  providers: [CreateAssessmentService, MatDatepickerModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
