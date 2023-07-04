import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category:any[]=[];
  currentCategory:any[]=[];

  category1={categoryName:"Information Tech", id:1};
  category2={categoryName:"Marketting", id:2};
  category3={categoryName:"Sales", id:3};
  category4={categoryName:"Manufacturing", id:4};
  categories=[this.category1, this.category2, this.category3, this.category4]
  constructor(){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setCurrentCategory(category:any){
    this.currentCategory= category.categoryName;
    console.log(this.currentCategory)

  }

}
