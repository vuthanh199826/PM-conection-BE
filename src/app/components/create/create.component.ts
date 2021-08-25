import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }
  create() {
    const product = this.productForm.value;
    this.productService.create(product).subscribe(data => {
      this.productForm.reset();
      alert('success');
      this.router.navigate(['/list']);
    }, error => {
      console.log(error);
    });

  }

}
