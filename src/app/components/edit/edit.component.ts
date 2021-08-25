import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  product: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl()
  });
  id: number;

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      this.id = +data.get('id');
      this.getProduct(this.id);
    });
  }

  ngOnInit(): void {
  }
  getProduct(idProduct: number) {
    this.productService.getById(idProduct).subscribe(data => {
      console.log(data);
      this.product = new FormGroup({
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        description: new FormControl(data.description)
      });
    });
  }
  update() {
    const newProduct: Product = this.product.value;
    newProduct.id = this.id;
    this.productService.update(newProduct).subscribe(() => {
      alert('success');
      this.router.navigate(['/list']);
    }, error => {
      console.log(error);
    });
  }

}
