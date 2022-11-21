import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeyService {

  userName:any='';   // User input value 

 
  constructor(private http: HttpClient) { }


  // Get all the questions from json file 
  getJSONQuestions(){
    return this.http.get('assets/questions.json')
  }

}
