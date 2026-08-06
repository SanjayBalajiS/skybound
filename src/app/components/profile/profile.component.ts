import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | null>;
  saving = false;
  successMsg = '';
  editPhone = '';

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser;
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        // Just mocking phone since it's not in our model currently
        this.editPhone = (user as any).phone || '';
      }
    });
  }

  getTier(miles: number): string {
    if (miles > 50000) return 'Platinum';
    if (miles > 25000) return 'Gold';
    if (miles > 10000) return 'Silver';
    return 'Blue (Member)';
  }

  saveProfile(user: User) {
    this.saving = true;
    this.successMsg = '';
    
    // Simulate API call to save profile details
    setTimeout(() => {
      this.saving = false;
      this.successMsg = 'Profile successfully updated!';
      
      // Clear success message after 3 seconds
      setTimeout(() => this.successMsg = '', 3000);
    }, 1000);
  }
}
