import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  cities: string[] = [];
  
  isLoading = false;
  error: string | null = null;
  
  searchTerm = '';
  selectedCity = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  currentPage = 1;
  itemsPerPage = 6;
  
  viewMode: 'card' | 'table' = 'card';

  constructor(
  private userService: UserService,
  private router: Router,
  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
  this.isLoading = true;
  this.error = null;
  this.cdr.detectChanges();

  const startTime = Date.now();
  const minLoadingTime = 2000; // 2 seconds

  this.userService.getUsers().subscribe({
    next: (users) => {
      console.log('Users received:', users);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      // Wait for remaining time to show loading for at least 2 seconds
      setTimeout(() => {
        this.users = users;
        this.filteredUsers = users;
        this.cities = this.userService.getUniqueCities(users);
        this.isLoading = false;
        this.cdr.detectChanges();
      }, remainingTime);
    },
    error: (error) => {
      console.error('Error loading users:', error);
      this.error = 'Failed to load users. Please try again later.';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

  setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.performSearch(searchTerm);
      });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchSubject.next(value);
    this.currentPage = 1;
  }

  performSearch(searchTerm: string): void {
    let result = this.users;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (this.selectedCity) {
      result = result.filter(user => user.address.city === this.selectedCity);
    }

    this.filteredUsers = result;
  }

  onCityChange(city: string): void {
    this.selectedCity = city;
    this.performSearch(this.searchTerm);
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCity = '';
    this.filteredUsers = this.users;
    this.currentPage = 1;
  }

  viewUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'card' ? 'table' : 'card';
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}