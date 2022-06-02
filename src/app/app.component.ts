import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Food } from './food.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { mockFood } from './food.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  select = []
  foodControl = new FormControl()
  filteredFood: Observable<Food[]>
  listFood: Food[] = mockFood
  sum = 0
  round = 0
  popup = false
  question: string
  food: Food;
  needSugar = 0;

  formFood : FormGroup = new FormGroup({
    "count": new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
  })

  sugarForm : FormGroup = new FormGroup({
    "sugar": new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
  })

  ngOnInit() {
    this.filteredFood = this.foodControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.listFood.slice())),
    );
  }

  displayFn(food: Food): string {
    return food && food.name ? food.name : '';
  }

  private _filter(name: string): Food[] {
    const filterValue = name.toLowerCase();

    return this.listFood.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  deleteFood(food) {
    for(let i = 0; i < this.select.length; i++) {
      if(this.select[i].id == food.id) {
        let index = this.select.indexOf(this.select[i])
        this.select.splice(index, 1)
        break
      }
    }
  }

  addFood(food) {
    this.food = food
    this.question = 'Сколько ' + food.question + ' ты съела?'
  }

  sendFormFood() {
    let arr = {
      food: this.food,
      count: this.formFood.value.count,
    }
    this.select.push(arr)
    this.foodControl.setValue('')
    this.formFood.reset()
  }

  calcFood() {
    this.select.forEach(res => {
      this.sum += (res.count * res.food.min)
    })
    this.round = Math.round(this.sum)
    this.sum = +this.sum.toFixed(3)
    this.popup = true
  }

  clear() {
    this.select = []
  }

  sendSugarForm() {
    if(this.sugarForm.value.sugar > 7) {
      this.needSugar = 1;
    } else if (this.sugarForm.value.sugar < 7) {
      this.needSugar = -1
    } else {
      this.needSugar = 0
    }
    this.needSugar += this.round
  }


  back() {
    this.popup = false
    this.sum = 0;
  }
}