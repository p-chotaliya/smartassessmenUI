import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateAssessmentService {

  constructor(
    private  httpClient: HttpClient
  ) { }

  getAssessmentDetails(teacher_id){
      return this.httpClient.get(`${environment.domain_url}/teacher/test/${teacher_id}`);
  }

  createAssessment(ass_data){
    return this.httpClient.post<any>(`${environment.domain_url}/teacher/create-test`, ass_data, {observe: 'response'});
  }

  getSingleAssessment(ass_id){
    return this.httpClient.get(`${environment.domain_url}/teacher/assessment/${ass_id}`);
  }

  editAssessment(ass_data){
    return this.httpClient.put(`${environment.domain_url}/teacher/create-test`, ass_data, {observe: 'response'});
  }

  deleteAssessment(ass_id){
    return this.httpClient.delete(`${environment.domain_url}/teacher/create-test/${ass_id}`,{observe:'response'});
  }
}
