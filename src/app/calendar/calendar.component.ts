import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { ApiService } from '../api.service';
import { Calendar } from '../calendar';

import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {Contact} from '../contact';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  modaltitle: any;
  eventsModel: any;
  contacts: Contact[];
  eventId: string;
  search: (text$: Observable<string>) => Observable<any[]>;
  modalOptions: NgbModalOptions;
  nazwisko: string;
  clickedItem: number;
  selectedEvent: Calendar = {
    id: null,
    id_user: null,
    id_klient: null,
    id_inwest: null,
    nazwa: null,
    opis: null,
    data: null,
    status: null,
    typ: null
  };

  types = [
    {value: '1', name: 'Rozmowa telefoniczna'},
    {value: '2', name: 'Spotkanie'},
    {value: '3', name: 'Zadanie'},
    {value: '4', name: 'Termin'},
    {value: '5', name: 'E-mail'},
    {value: '6', name: 'Obiad'}
  ];

  statuses = [
    {value: '1', name: 'wykonane'},
    {value: '2', name: 'w trakcie'},
    {value: '3', name: 'niewykonane'}
  ];

  investments = [
    {value: '1', name: 'Inwstycja 1'},
    {value: '2', name: 'Inwestycja 2'},
    {value: '3', name: 'Inwestycja 3'},
    {value: '4', name: 'Inwestycja 4'}
  ];


  formatter = (client: {nazwisko: string}) => client.nazwisko;

  // @ts-ignore
  @ViewChild('mymodal') editModal: TemplateRef<any>;

  constructor(private apiService: ApiService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.getEvents();
    this.getClients();
  }

  openModal() {
    this.modaltitle = 'Dodaj wydarzenie';
    this.modalService.open(this.editModal, { centered: true });
  }
  handleDateClick(arg) {
    this.modaltitle = 'Dodaj wydarzenie';
    // todo: find better way to clear inputs
    this.resetModalForm();
    this.selectedEvent.data = arg.dateStr;
    this.modalService.open(this.editModal, { centered: true });
  }
  handleEventClick(arg) {
    this.eventId = arg.event._def.publicId;
    this.apiService.editEvent(Number(this.eventId)).subscribe((calendar: Calendar[]) => {
      // @ts-ignore
      this.selectedEvent = calendar;
    });
    this.modaltitle = 'Edytuj wydarzenie';
    this.modalService.open(this.editModal, { centered: true });
  }
  newEvent(form) {
    this.apiService.createEvent(form.value).subscribe((calendar: Calendar) => {
      this.modalService.dismissAll();
      this.getEvents();
    });
  }
  getEvents() {
    this.apiService.readEvents().subscribe((calendar: Calendar[]) => {
      this.eventsModel = calendar;
    });
  }
  getClients() {
    this.apiService.readContact().subscribe((contacts: Contact[]) => {
      const names = [];
      // todo: change for to foreach or map
      for (let i = 0; i < contacts.length; i++) {
        names.push({nazwisko: contacts[i].nazwisko, id: contacts[i].id});
      }

      this.search = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(term => term.length < 2 ? []
            : names.filter(v => v.nazwisko.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
        );
    });
  }
  resetModalForm() {
    this.selectedEvent.typ = null;
    this.selectedEvent.status = null;
    this.selectedEvent.nazwa = '';
    this.selectedEvent.id_inwest = null;
    this.selectedEvent.id_klient = null;
    this.selectedEvent.opis = '';
  }
  selectedItem(item) {
    this.clickedItem = item.item.id;
    console.log(this.clickedItem);
  }
}
