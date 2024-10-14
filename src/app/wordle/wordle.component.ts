import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-wordle',
  standalone: true,
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule],  // Include CommonModule here
})
export class WordleComponent implements OnInit {
  guess: string = '';  
  result: string[] = [];  
  answer: string = '';  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWord();
  }

  getWord() {
    this.http.get<{ word: string }>('http://localhost:3000/api/wordle/answer')
      .subscribe((data) => {
        this.answer = data.word;
      });
  }
  submitGuess() {
    this.http.post<{ result: string[] }>('http://localhost:3000/api/wordle/guess', { guess: this.guess })
      .subscribe((data) => {
        this.result = data.result;
      });
  }
  getNextWord() {
    this.http.get<any>('http://localhost:3000/api/wordle/next')
      .subscribe(response => {
        console.log('Next word:', response.word); // Log the new word
        this.guess = ''; // Reset the guess input
        this.result = []; // Clear previous results if desired
        this.answer = response.word;
      }, error => {
        console.error('Error:', error); // Handle error
      });
  }
}
