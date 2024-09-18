import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Course } from "../model/course";
import { CourseImageComponent } from "../course-image/course-image.component";

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

  // CONTENTCHILD DECORATOR mi permette di ottenere un riferimento diretto ad alcuni dei contenuti proiettati
  // se mi riferisco ad un elemento html normale nel content tag ottengo un ElementRef, quindi un elemento nativo del dom
  // posso comunque riferirmi anche ad un componente che è nel content tag, ad esempio proietto l'immagine tramite componente CourseImageComponent
  @ContentChild(CourseImageComponent)
  immagineComponente: CourseImageComponent;

  // altrimenti per ottenere l'elemento nativo del dom aggiungo la proprietà read elementref
  @ContentChild(CourseImageComponent, { read: ElementRef })
  immagineComponenteElementRef: CourseImageComponent;

  onCourseViewed() {
    // quando clicco emetterò l'evento custom courseSelected e gli passo quello che voglio trasmettere come payload
    this.courseSelected.emit(this.course);
    console.log(this.immagineComponente);
    console.log(this.immagineComponenteElementRef);
  }

  checkIconUrl() {
    return this.course.iconUrl;
  }
}
