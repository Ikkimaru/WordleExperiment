import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WordleComponent } from './app/wordle/wordle.component';  // Your standalone component

bootstrapApplication(WordleComponent, {
  providers: [
    importProvidersFrom(HttpClientModule)  // <-- Provide HttpClientModule globally
  ]
}).catch(err => console.error(err));
