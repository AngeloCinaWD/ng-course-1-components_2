import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrl: "./course-card.component.css",
})
export class CourseCardComponent {
  // il valore di questa proprietà arriva dall'esterno, da padre a figlio e potrà essere utilizzato nel template html
  // @Input()
  // title: String;

  // invece di una stringa dichiaro che la proprietà course è un'oggetto definito dall'interfaccia Course
  @Input({
    required: true,
  })
  course: Course;

  // indice dell'elemento ricevuto come @Input
  @Input({ required: true })
  indice: number;

  // creo l'evento custom courseSelected ed indico che emetterà un oggetto Course
  // devo utilizzare il decoaratore @Output
  @Output()
  courseSelected = new EventEmitter<Course>();

  @Input()
  count: number;

  onCourseViewed() {
    // quando clicco emetterò l'evento custom courseSelected e gli passo quello che voglio trasmettere come payload
    this.courseSelected.emit(this.course);
  }

  buttonIsVisible() {
    return this.course.id === 1 || this.course.id === 5;
  }

  checkIconUrl() {
    return this.course.iconUrl;
  }

  isBeginner() {
    return this.course.category === "BEGINNER";
  }

  checkCategory() {
    return `${this.course.category.toLowerCase()}`;
  }

  textDecoration() {
    return "underline";
  }

  checkTextStyle() {
    return {
      color: this.course.id === 1 ? "yellow" : "black",
      "text-decoration":
        this.course.category !== "BEGINNER" ? "underline" : "no",
    };
  }
}
