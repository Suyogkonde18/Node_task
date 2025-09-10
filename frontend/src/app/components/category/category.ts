import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api'; 

@Component({
  selector: 'app-category-list',
  templateUrl: './category.html',  
  styleUrls: ['./category.css'],  
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  categoryName = '';
  editId: number | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  saveCategory() {
    if (this.editId) {
      this.api.updateCategory(this.editId, { CategoryName: this.categoryName })
        .subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
    } else {
      this.api.addCategory({ CategoryName: this.categoryName })
        .subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
    }
  }

  editCategory(cat: any) {
    this.editId = cat.CategoryId;
    this.categoryName = cat.CategoryName;
  }

  deleteCategory(id: number) {
    this.api.deleteCategory(id).subscribe(() => this.loadCategories());
  }

  resetForm() {
    this.categoryName = '';
    this.editId = null;
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
