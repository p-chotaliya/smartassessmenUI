import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubmissionService} from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  ass_id:string;
  submission_data:any;
  total_submission:number;
  constructor(
    private route: ActivatedRoute,
    public submissionService:SubmissionService,
  ) { }

  ngOnInit(): void {
    this.ass_id = this.route.snapshot.paramMap.get('assessmentID');
    console.log('sbmission assessment',this.ass_id);
    this.getSubmission();
  }

  getSubmission(){
    let response;
    this.submissionService.get_submission(this.ass_id).subscribe(res=>{
      if(res.status == 200){
        response = res;
        this.submission_data = response.body.data;
        this.total_submission = this.submission_data.length;
        console.log(this.submission_data)
      }
    },err=>{
      console.log(err);
    })
  }

}
