import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  submitting = false;
  successMsg = '';

  submitForm() {
    this.submitting = true;
    this.successMsg = '';

    setTimeout(() => {
      this.submitting = false;
      this.successMsg = 'Thank you! Your message has been sent to our support team.';
    }, 1500);
  }
}
