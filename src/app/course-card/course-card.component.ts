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

  // creo l'evento custom courseSelected ed indico che emetterà un oggetto Course
  // devo utilizzare il decoaratore @Output
  @Output()
  courseSelected = new EventEmitter<Course>();

  onCourseViewed() {
    // quando clicco emetterò l'evento custom courseSelected e gli passo quello che voglio trasmettere come payload
    this.courseSelected.emit(this.course);
  }

  checkIconUrl() {
    return this.course.iconUrl;
  }
}
