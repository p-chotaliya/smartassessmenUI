import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


import {CreateAssessmentService} from '../services/create-assessment.service';
import {CreateQuestionService} from '../services/create-question.service';

import {AddAssessmentDetailsComponent} from '../add-assessment-details/add-assessment-details.component';
import {AddQuestionDialogComponent} from '../add-question-dialog/add-question-dialog.component';

@Component({
  selector: 'app-edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.css']
})
export class EditAssessmentComponent implements OnInit {

  ass_id: String;
  ass_title: String = '';
  ass_subject: String = '';
  ass_std: String = '';
  ass_marks: number;
  ass_passing_marks: number;
  ass_duration: number;
  start_date: Date = new Date();
  assessment_data: any;
  question_data:any;
  constructor(
    public createAssessmentService: CreateAssessmentService,
    public createQuestionService: CreateQuestionService,
    private route: ActivatedRoute,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ass_id = this.route.snapshot.paramMap.get('assessmentID');
    this.getAseessmentDetail(this.ass_id);
    this.getAssQuestions(this.ass_id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  open_add_question_dialog(){
    const dialogRef = this.matDialog.open( AddQuestionDialogComponent,
      {width: '500px',
        height: '500px',
        data: {ass_id: this.ass_id}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add question dialog was closed');
      this.getAssQuestions(this.ass_id);
    });
  }

  getAseessmentDetail(ass_id){
    let ass_data;
    this.createAssessmentService.getSingleAssessment(ass_id).subscribe( res => {
      ass_data = res;
      this.assessment_data = ass_data.data[0];
      this.ass_title = this.assessment_data.ass_title;
      this.ass_subject = this.assessment_data.sub_code;
      this.ass_duration = this.assessment_data.duration;
      this.start_date = this.assessment_data.start_date;
      this.ass_marks = this.assessment_data.marks;
      this.ass_passing_marks = this.assessment_data.passing_marks;
      this.ass_std = this.assessment_data.std;
      console.log(this.ass_subject)
    }, err => {
      console.log(err);
    });
  }

  editAssessment(){
    const ass_data={
      assessment_id: this.ass_id,
      title: this.ass_title,
      std: this.ass_std,
      duration: this.ass_duration,
      marks: this.ass_marks,
      passing_marks: this.ass_passing_marks,
      subject_code: this.ass_subject,
      start_date: this.start_date
    };
    let response;
    this.createAssessmentService.editAssessment(ass_data).subscribe( res =>{
      if(res.status === 200){
        response = res;
        this.openSnackBar(response.body.message,'close');
      }else{
        this.openSnackBar('error in updating','close');
      }
    }, err =>{
      console.log(err)
    })
  }

  getAssQuestions(ass_id){
    let question_data;
    this.createQuestionService.getQuestions(ass_id).subscribe( res => {
      question_data = res;
      this.question_data = question_data.data;
      // console.log(this.question_data)
    }, err => {
      console.log(err);
    });
  }

  editQuestion(question){
    // console.log(question);
    const q_data ={
      question_id: question.q_id,
      question: question.question,
      marks: question.marks,
      ans: question.ans
    };
    let response;
    this.createQuestionService.updateQuestion(q_data).subscribe( res => {
      if(res.status == 200){
        response= res;
        this.openSnackBar(response.body.message,'close');
      }
    }, err => {
      console.log(err);
    });
  }

  deleteQuetion(question_id){
    // console.log('question id', question_id);
    const confirmation = confirm('Are you sure you want to DELETE Question');
    if(confirmation){
      this.createQuestionService.deleteQuestion(question_id).subscribe( res => {
        if (res.status === 200){
          this.openSnackBar('question is deleted successfully','close');
          this.getAssQuestions(this.ass_id);
        }
      }, err => {
        console.log(err);
      })
    }
;
  }
}
