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
  // ognuna di queste proprietà è un oggetto che può essere utilizzato nel template del componente, quindi in app.component.html
  // coreCourse = COURSES[0];

  // rxjsCourse = COURSES[1];

  // ngrxCourse = COURSES[2];

  // commento le proprietà singole
  // creo una proprietà courses che sarà un array di Course
  courses: Course[] = COURSES;

  startDate = new Date();
  startDate2 = new Date("2024 09 08"); // creo data con stringa con anno mese giorno

  title = COURSES[0].description;

  price = 9.999934;

  rate = 0.67;

  // Per ottenere una reference ad un elemento nel template abbiamo bisogno del decoratore @ViewChild()
  // all'interno delle parentesi va definito come vogliamo ottenere la reference
  // passando il nome della classe del componente la variabile verrà popolata con un riferimento all'istanza del compoennte
  // il riferimento in questo modo viene associato al primo CourseCardComponent presente nel template, infatti se clicco su uno qualsiasi degli altri componenti vedo che in card c'è sempre il primo course
  // questo decoratore non permette di compiere query profonde nell'elemento, ad esempio se mettessi un riferimento all'interno del course-card component, ad esempio al tag img, otterrei un undefined
  // non è possibile con questo decorator interrogare elementi all'interno del componente
  @ViewChild(CourseCardComponent)
  card: CourseCardComponent;

  // interrogo un elemento nel template tramite nome dato con TEMPLATE REFERENCE, lo richiamo inserendo il nome come stringa
  // il collegamento tramite template reference è utile quando si hanno multipli elementi e se ne vuole interrogare uno in particolare
  @ViewChild("cardRef")
  card2: CourseCardComponent;

  // il nome della variabile può essere uno qualsiasi, quello che conta è quello passato al ViewChild decorator
  // con la template reference ed il tipo ElementRef ottengo l'html
  @ViewChild("container")
  container: ElementRef;

  // posso ottenere un collegamento all'html di un component e non alla sua istanza indicandolo in un oggetto nel decorator
  // la proprietà read è di default istance
  @ViewChild("cardRef", { read: ElementRef })
  collegamentoHTML: ElementRef;

  // VIEWCHILDREN DECORATOR
  // invece di permettere di interrogare un solo elemento della pagina permette di interrogare un insieme di elementi correlati
  // lo utilizziamo per esempio su un ngFor
  // restituisce una QueryList, un array di qualcosa, nel nostro caso di CourseCardComponent
  // i valori emessi sono istanze di COureCardComponent
  @ViewChildren(CourseCardComponent)
  courseCards: QueryList<CourseCardComponent>;

  // per ottenere una querylist di elementi html devo indicarlo tramite oggetto nel decoratore, proprietà read e cambiare il tipo alla proprietà come ElementRef
  @ViewChildren(CourseCardComponent, { read: ElementRef })
  coursecardsElementRef: QueryList<ElementRef>;

  constructor() {
    // le variabili con decoratore @ViewChild() non sono popolate nel costruttore
    // ottengo infatti un undefined
    // le variabili sono disponibili tramite Lifecycle Hook AfteerViewInit
    console.log(this.card);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // a quanto pare in ng18 posso anche non implementare l'interfaccia per il lifecycle hook
    console.log(this.card);

    // log della querylist ottenuta con il viewchildren decorator
    // una querylist ci mette a disposizione una serie di proprietà e metodi per interrogare gli elementi in essa contenuti
    console.log(this.courseCards);
    // ad esempio la proprietà first ci restituisce il primo elemento della collection, last l'ultimo
    console.log(this.courseCards.first);
    // ci sono altre proprietà come length
    console.log(this.courseCards.length);
    // map, foreach, filter metodi degli array classici
    // importante è la pòroprietà changes, un observable al quale ci dobbiamo sottoscrivere e che emetterà più valori nel tempo, ogni volta che la collection viene modificata
    // al subbscribe passiamo una funzione che verrà eseguita ogni volta che c'è un cambiamento, solo se c'è un cambiamento nello state
    // per fare una prova aggiungo un button nel template per aggiungere un corso
    // funziona solo se il riferimento del viewchildren è il tipo di componente, se ci metto una template reference non triggera, ho riferimenti all'html
    this.courseCards.changes.subscribe((cards) => console.log(cards));
  }

  aggiungiCorso() {
    console.log(this.courseCards.last);
    this.courses.push({
      id: 1,
      description: "Angular core deep dive",
      iconUrl:
        "https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png",
      longDescription:
        "A detailed walk-through of the most important part of Angular - the Core and Common modules",
      category: "INTERMEDIATE",
      lessonsCount: 10,
    });
  }

  // per interrogare elementi nativi del DOM, pieno html, utilizzo il tipo ElementRef

  onCardClicked(course: Course) {
    console.log(course);
    // facendo il console log di card ottengo un riferimento ad una istanza del componente
    // le proprietà sono course, indice e count che ora non c'è perchè non è definita per questo compoennte
    // posso vedere tutte le sue prorietà e l'evento emesso (in questo caso courseSelected)
    console.log(this.card);
    console.log(this.card2);
    // l'oggetto container restituisce al suo interno un ElementRef con una prorpietà nativeElement che contiene una serie di proprietà legate all'html dell'elemento
    console.log(this.container.nativeElement);
    console.log(this.container.nativeElement.baseURI);
    console.log(this.container.nativeElement.children);

    // ottengo sempre un nativeElement
    console.log(this.collegamentoHTML);
  }

  // funzione di tracciamento
  trackCourse(index: number, course: Course) {
    return course.id;
  }
}
