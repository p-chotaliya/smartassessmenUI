import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(
    private  httpClient: HttpClient
  ) { }


  get_submission(ass_id){
    return this.httpClient.get(`${environment.domain_url}/teacher/assessment/submission/${ass_id}`,{observe:'response'});
  }

  get_answer(student_id,ass_id){
    return this.httpClient.get(`${environment.domain_url}/teacher/assessment/answer/${student_id}/${ass_id}`,{observe:'response'});
  }

  upload_marks(ans_data){
    return this.httpClient.post(`${environment.domain_url}/teacher/assessment/upload-marks`,ans_data,{observe:'response'});
  }

  change_check_status(body){
    return this.httpClient.post(`${environment.domain_url}/teacher/assessment/change-check-status`,body,{observe:'response'});
  }

  get_no_of_submissions(t_id){
    return this.httpClient.get(`${environment.domain_url}/teacher/assessment-submissions/${t_id}`,{observe:'response'});
  }
}
