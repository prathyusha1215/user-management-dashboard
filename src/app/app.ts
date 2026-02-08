import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="navbar-content">
          <h1 class="navbar-title">User Management</h1>
          <button class="theme-toggle" (click)="toggleTheme()" 
                  [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
            <span *ngIf="!isDarkMode">🌙</span>
            <span *ngIf="isDarkMode">☀️</span>
          </button>
        </div>
      </nav>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <p>&copy; 2025 User Management Dashboard. Built with Angular.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--background-primary);
      transition: background-color 0.3s ease;
    }

    .navbar {
      background-color: var(--background-secondary);
      border-bottom: 2px solid var(--border-color);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
    }

    .theme-toggle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid var(--border-color);
      background-color: var(--background-primary);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .theme-toggle:hover {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      transform: rotate(180deg);
    }

    .main-content {
      flex: 1;
    }

    .footer {
      background-color: var(--background-secondary);
      border-top: 2px solid var(--border-color);
      padding: 1.5rem 1rem;
      text-align: center;
      color: var(--text-secondary);
      margin-top: 4rem;
    }

    .footer p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .navbar-title {
        font-size: 1.25rem;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}