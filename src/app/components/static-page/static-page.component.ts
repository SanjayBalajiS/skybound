import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-static-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-page.component.html',
  styleUrl: './static-page.component.css'
})
export class StaticPageComponent implements OnInit {
  topic = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.topic = params.get('topic') || '';
    });
  }

  getTitle(): string {
    if (this.topic === 'fees-and-charges') return 'Fees & Charges';
    if (this.topic === 'codeshare') return 'Codeshare Partners';
    if (this.topic === 'about-us') return 'About Us';
    if (this.topic === 'faq') return 'Help & FAQs';
    if (this.topic === 'terms') return 'Terms and Conditions';
    if (this.topic === 'whatsapp') return 'Contact on WhatsApp';
    return 'Information';
  }
}
