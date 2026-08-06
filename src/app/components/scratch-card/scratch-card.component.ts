import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scratch-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scratch-card.component.html',
  styleUrl: './scratch-card.component.css'
})
export class ScratchCardComponent {
  isRevealed = false;

  revealCode() {
    this.isRevealed = true;
  }
}
