import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { HeyService } from 'src/app/hey.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  user: string = ''; //to get the user name from services
  allQuestions: any = []; //to store all the question whatever we get from response
  currentQuestion: number = 0; // to get the current question
  points: number = 0; // For points 
  timer = 60;   //timer purose
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any; // for timer
  progressCount: string = '0'; //for progressbar
  resultBox:boolean = false;


  constructor(private service: HeyService) { }

  ngOnInit(): void {
    this.user = this.service.userName
    this.renderAllQuestions();
    this.startCounter();
  }

  // Render all questions in page 
  renderAllQuestions() {
    this.service.getJSONQuestions()
      .subscribe(res => {
        this.allQuestions = res;
        console.log(this.allQuestions.questions);
      })
  }


  // For previous questions
  previousQuestion() {
    this.currentQuestion--
  }

  //For next question
  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion >= this.allQuestions.questions.length) {
      this.currentQuestion--;
      alert('No more questions 😟');
    }
  }

  //For answer
  getAnswer(currQ: number, opt: any) {
    if(this.currentQuestion === this.allQuestions.questions.length-1){
      this.resultBox = true;
      this.stopCounter();
    }
    if (opt.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressStatus();
      }, 1000)

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.incorrectAnswer++;
        this.resetCounter();
        this.getProgressStatus();
      }, 1000)
      this.points -= 10;
    }
  }



  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.timer--;
        if (this.timer === 0) {
          this.currentQuestion++;
          this.timer = 60;
          this.points -= 10
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000)
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.timer = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.timer = 60;
    this.startCounter();
  }


  resetQuiz() {
    this.resetCounter();
    this.renderAllQuestions();
    this.timer = 60;
    this.points = 0;
    this.currentQuestion = 0;
    this.progressCount = '0';
  }


  getProgressStatus() {
    this.progressCount = ((this.currentQuestion * this.allQuestions.questions.length) / 100).toString();
    // return this.progressCount;
    console.log(this.progressCount,'ksadhjkhskhd')
  }

}
