import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Food } from './food.model';
import { mockFood } from './food.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Food[]>;

  options: Food[] = mockFood;

  select = [];
  sum = 0;
  popup = false;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(food: Food): string {
    return food && food.name ? food.name : '';
  }

  private _filter(name: string): Food[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addEl(el) {
    this.select.push(el)
    this.myControl.setValue('')
  }

  deleteEl(el) {
    for(let i = 0; i < this.select.length; i++) {
      if(this.select[i].id == el.id) {
        let index = this.select.indexOf(this.select[i])
        this.select.splice(index, 1)
        break
      }
    }
  }

  calc() {
    this.select.forEach(res => {
      this.sum += res.value
    })
    this.popup = true
  }

  back() {
    this.popup = false
    this.sum = 0;
  }

  clean() {
    this.select = []
  }
}