import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService {

  constructor(
    private  httpClient: HttpClient
  ) { }

  createQuestion(question_data){
    return this.httpClient.post<any>(`${environment.domain_url}/teacher/add-question`, question_data, {observe: 'response'});
  }

  getQuestions(ass_id){
    return this.httpClient.get(`${environment.domain_url}/teacher/assessment/question/${ass_id}`);
  }

  updateQuestion(question_data){
    return this.httpClient.put(`${environment.domain_url}/teacher/add-question`,question_data,{observe: 'response'});
  }

  deleteQuestion(question_id){
    return this.httpClient.delete( `${environment.domain_url}/teacher/add-question/${question_id}`,{observe:'response'});
  }
}
