import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.html',
  styleUrl: './product.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  productName = '';
  categoryId: number | null = null;
  categories: any[] = [];
  editId: number | null = null;

  // Pagination
  page = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadProducts();
    this.api.getCategories().subscribe(res => this.categories = res);
  }

  loadProducts() {
    this.api.getProducts(this.page, this.pageSize).subscribe(res => {
      this.products = res.data;
      this.totalPages = res.totalPages;
    });
  }

  saveProduct() {
    if (this.editId) {
      this.api.updateProduct(this.editId, { ProductName: this.productName, CategoryId: this.categoryId })
        .subscribe(() => { this.loadProducts(); this.resetForm(); });
    } else {
      this.api.addProduct({ ProductName: this.productName, CategoryId: this.categoryId })
        .subscribe(() => { this.loadProducts(); this.resetForm(); });
    }
  }

  editProduct(prod: any) {
    this.editId = prod.ProductId;
    this.productName = prod.ProductName;
    this.categoryId = prod.CategoryId;
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  changePage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.loadProducts();
    }
  }

  resetForm() {
    this.productName = '';
    this.categoryId = null;
    this.editId = null;
  }
}
