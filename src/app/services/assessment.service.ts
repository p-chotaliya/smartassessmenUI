import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(
    private  httpClient: HttpClient
  ) { }

  getAssessmentData(ass_id){
    return this.httpClient.get(`${environment.domain_url}/student/assessment/${ass_id}`,{ observe:'response'});
  }

  submitAssessment(ass_data){
    return this.httpClient.post(`${environment.domain_url}/student/assessment/submit` , ass_data, {observe:'response'});
  }

  submitAnswerImage(ans_image_data){
    return this.httpClient.post(`${environment.domain_url}/student/assessment/submit/answer-image`, ans_image_data,{observe:'response'});
  }

  add_student(body){
    return this.httpClient.post(`${environment.domain_url}/student/add-student`, body,{observe:'response'});
  }
}

