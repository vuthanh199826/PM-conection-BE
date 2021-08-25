import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  productForm: FormGroup;
  id: number;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = +data.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit(): void {}

  getProduct(id: number) {
    return this.productService.getById(id).subscribe(data => {
      this.productForm = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        description: new FormControl(data.description)
      });
    });
  }
  delete(id: number) {
    console.log(id);
    this.productService.delete(id).subscribe(data => {
      this.router.navigate(['/list']);
      console.log('success');
    }, error => {
      console.log(error);
    });
  }

}
