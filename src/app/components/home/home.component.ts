import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeyService } from 'src/app/hey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  value:string='';

  constructor(private service: HeyService, private router : Router) { }

  ngOnInit(): void {
  }

  submitName(){
    // alert(this.value)
    this.service.userName= this.value;
    if(this.value){
      this.router.navigate(['quiz'])
    }else{
      alert('Enter a name to start the game.')
    }
  }

}
