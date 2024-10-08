import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  courses: Course[] = COURSES;

  constructor() {}

  ngAfterViewInit(): void {}

  // per interrogare elementi nativi del DOM, pieno html, utilizzo il tipo ElementRef

  onCardClicked(course: Course) {
    console.log(course);
  }
}
