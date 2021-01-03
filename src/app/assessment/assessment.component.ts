
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';


import { AssessmentService } from './../services/assessment.service';
import { utf8Encode } from '@angular/compiler/src/util';




@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  ass_id:string;
  ass_data:any;
  assMode:boolean = true;
  student_id:string ='';
  email_id:string ='';
  constructor(
    private route: ActivatedRoute,
    public assessmentService: AssessmentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ass_id = this.route.snapshot.paramMap.get('assessmentID');
    console.log(this.ass_id);
    this.getAssessmentData(this.ass_id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  getAssessmentData(ass_id){
    let assessment_data;
    this.assessmentService.getAssessmentData(ass_id).subscribe(res=>{
      if(res.status === 200){
        assessment_data = res.body;
        this.ass_data = assessment_data.data;
        this.ass_data = this.ass_data.map(data=>{
          data['answer']='';
          data['ans_image']=File;
          return data;
        })
        console.log(this.ass_data)
      }
    },err=>{
      console.log(err)
    })
  }

  startAssessment(){
    if(this.student_id !== '' && this.email_id !== ''){
      const body = {
        student_id :this.student_id,
        student_email:this.email_id,
      }
      this.assessmentService.add_student(body).subscribe(res=>{
        if(res.status == 200){
          this.openSnackBar('student added' , 'close');
          this.assMode=false;
        }else{
          this.openSnackBar('error in adding student','close');
        }
      },err=>{
        console.log(err);
      })

    }else{
      this.openSnackBar('please fill student id and email','close');

    }
  }


  fileChange(files,quesation_data){
    // console.log(files[0])
    // console.log(quesation_data)
    this.ass_data = this.ass_data.map(data=>{
      if(data.q_id === quesation_data.q_id){
        data.ans_image = files[0];
        return data;
      }else{
        return data;
      }
    })
  }

  fileChangeUpload(question_data){
    if(question_data.ans_image.name === 'File'){
      this.openSnackBar('please choose file','close');
      return ;
    }
    let formData = new FormData();
    formData.append('ansImage',question_data.ans_image);
    formData.append('ass_id',question_data.ass_id);
    formData.append('question_id',question_data.q_id);
    formData.append('student_id',this.student_id);
    formData.append('student_email',this.email_id);

    this.assessmentService.submitAnswerImage(formData).subscribe(res=>{
      if(res.status==200){
        this.openSnackBar('answer image uploaded','close');
      }else{
        this.openSnackBar('error in uploading anser image','close');
      }
    },err=>{
      console.log(err);
    })
  }

  submitAssessment(){
    console.log(this.ass_data);
    console.log(this.student_id);
    console.log(this.email_id);
    const confirmation = confirm('Are you sure you want to SUBMIT ASSESSMENT !!!!!');
    if(confirmation){
      const body ={
        ass_data : this.ass_data,
        student_id : this.student_id,
        student_email : this.email_id
      }
      console.log(body);
      let response;
      this.assessmentService.submitAssessment(body).subscribe(res=>{
        if(res.status==200){
          response=res;
          this.openSnackBar(response.body.message,'close');
        }
      },err=>{
        console.log(err)
      })
    }else{
      return;
    }
  }
}
