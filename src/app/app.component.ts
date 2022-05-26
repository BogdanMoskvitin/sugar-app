import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breakfast = [{ id: 1, name: 'Бутерброд', value: 2 }, { id: 2, name: 'Какао', value: 1 },]
  lunch = [{ id: 3, name: 'Хлеб', value: 2 }, { id: 4, name: 'Суп', value: 0 },]
  dinner = [{ id: 5, name: 'Булочка', value: 2 }, { id: 6, name: 'Чай', value: 1 },]

  view = {
    breakfast: false,
    lunch: false,
    dinner: false,
  }

  select = []

  sum = 0

  popup = false

  viewBreakfast() {
    this.view = {
      breakfast: true,
      lunch: false,
      dinner: false,
    }
  }

  viewLunch() {
    this.view = {
      breakfast: false,
      lunch: true,
      dinner: false,
    }
  }

  viewDinner() {
    this.view = {
      breakfast: false,
      lunch: false,
      dinner: true,
    }
  }

  addEl(el) {
    this.select.push(el)
  }

  deleteEl(el) {
    this.select.forEach(res => {
      if(res.id == el.id){
        let index = this.select.indexOf(res)
        this.select.splice(index, 1)
      }
    })
  }

  calc() {
    this.select.forEach(res => {
      this.sum += res.value
    })
    this.popup = true
  }

  back() {
    this.popup = false
  }

  clean() {
    this.select = []
  }
}
