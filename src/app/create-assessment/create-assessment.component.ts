import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {AddAssessmentDetailsComponent} from '../add-assessment-details/add-assessment-details.component';

import {CreateAssessmentService} from '../services/create-assessment.service';
import {SubmissionService} from '../services/submission.service';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})
export class CreateAssessmentComponent implements OnInit {
  teacher_id: String = 'T101PAR';
  assessment_data: any;
  constructor(
    private createAssessmentService: CreateAssessmentService,
    private submissionService: SubmissionService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.get_ass_data();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  get_ass_data(){
    let res_data;
    this.createAssessmentService.getAssessmentDetails(this.teacher_id).subscribe(res => {
      res_data = res;
      this.assessment_data = res_data.data;
      console.log('in get ass data',this.assessment_data);
      this.get_total_no_of_submissions();
    }, err => {
      console.log(err);
    });
  }

  get_total_no_of_submissions(){
    let response;
    this.submissionService.get_no_of_submissions(this.teacher_id).subscribe(res=>{
      if(res.status == 200){
        response = res.body;
        this.assessment_data.forEach(assdata => {
          response.total_submission_data.forEach(subdata => {
            if(assdata.ass_id == subdata.ass_id){
              assdata['total_sub'] = subdata.total_sub
            }
          });
          return assdata;
        });
        console.log('in get total no if submission',this.assessment_data)
      }

    },err=>{
      console.log(err);
    })
}

  deleteAssessment(ass_id){
    const confirmation = confirm('Are you sure want to delete ASSESSMENT')
    if(confirmation){
      let response;
      this.createAssessmentService.deleteAssessment(ass_id).subscribe(res=>{
        if(res.status === 200){
          response = res;
          this.get_ass_data();
          this.openSnackBar(response.body.message,'close');
        }
      },err=>{
        console.log(err);
      })
    }else{
      return;
    }

  }

  open_create_ass_dialog(){
    const dialogRef = this.matDialog.open( AddAssessmentDetailsComponent,
      {width: '500px', height: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.get_ass_data();
    });
  }
}
