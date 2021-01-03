import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {SubmissionService} from '../../services/submission.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  student_id:string;
  ass_id:string;
  ans_data:any;
  constructor(
    private route :ActivatedRoute,
    public submissionService:SubmissionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.student_id=params['student-id'];
      this.ass_id = params['ass-id'];
    })
    this.get_answer();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  get_answer(){
    let response;
    this.submissionService.get_answer(this.student_id,this.ass_id).subscribe(res=>{
      if(res.status == 200){
        response=res;
        this.ans_data = response.body.data;
        console.log(this.ans_data)
      }
    },err=>{
      console.log(err);
    })
  }

  uploadMarks(ans_data){
    const body ={
      student_id: ans_data.student_id,
      ass_id :ans_data.ass_id,
      question_id:ans_data.q_id,
      obtain_marks:ans_data.obtain_marks
    }
    console.log(body)
    this.submissionService.upload_marks(body).subscribe(res=>{
      if(res.status==200){
        this.openSnackBar('marks uploded','close');
      }else{
        this.openSnackBar('error in uploading marks','close');
      }
    },err=>{
      console.log(err);
    })
  }

  assessmentcheked(){
    const body = {
      assessment_id:this.ass_id,
      student_id :this.student_id,
    }
    this.submissionService.change_check_status(body).subscribe(res=>{
      if(res.status == 200){
        this.openSnackBar('assessment checked','close')
      }else{
        this.openSnackBar('error in checked assessment','closes')
      }
    },err=>{
      console.log(err)
    })
  }

}
