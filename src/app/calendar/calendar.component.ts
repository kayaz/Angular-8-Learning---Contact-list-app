import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../api.service';
import { Calendar } from '../calendar';
import { Contact } from '../contact';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  constructor(private apiService: ApiService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  modalForm: FormGroup;
  submitted = false;

  calendarPlugins = [dayGridPlugin, interactionPlugin];
  modaltitle: any;
  eventsModel: any;
  selectedName: any;
  contacts: Contact[];
  eventId: string;
  search: (text$: Observable<string>) => Observable<any[]>;
  modalOptions: NgbModalOptions;
  clickedItem: number;
  selectedEvent: Calendar = {
    id: null,
    id_user: null,
    id_klient: null,
    id_inwest: null,
    nazwa: null,
    nazwa_klient: null,
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

  // @ts-ignore
  @ViewChild('mymodal') editModal: TemplateRef<any>;

  formatter = (client: {nazwisko: string}) => client.nazwisko;

  ngOnInit() {
    this.getEvents();
    this.getClients();

    this.modalForm = this.formBuilder.group({
      typ: [''],
      status: [''],
      nazwa: ['', Validators.required],
      data: [''],
      id_inwest: [''],
      opis: [''],
      typeahead_user: ['', Validators.required]
    });
  }

  openModal() {
    this.modaltitle = 'Dodaj wydarzenie';
    // todo: find better way to clear inputs
    this.resetModalForm();
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
    this.apiService.editEvent(Number(this.eventId)).subscribe((calendar) => {
      // @ts-ignore
      this.selectedEvent = calendar;

      this.modalForm.setValue({
        typ: this.selectedEvent.typ,
        status: this.selectedEvent.status,
        nazwa: this.selectedEvent.nazwa,
        data: this.selectedEvent.data,
        id_inwest: this.selectedEvent.id_inwest,
        opis: this.selectedEvent.opis,
        typeahead_user: {nazwisko: this.selectedEvent.nazwa_klient}
      });
    });
    this.modaltitle = 'Edytuj wydarzenie';
    this.modalService.open(this.editModal, { centered: true });
  }
  newEvent(form) {
    this.submitted = true;
    if (this.modalForm.invalid) {
      return;
    }

    alert('SUCCESS!!');

    // this.apiService.createEvent(form.value).subscribe(() => {
    //   this.modalService.dismissAll();
    //   this.getEvents();
    // });
  }
  getEvents() {
    this.apiService.readEvents().subscribe((calendar) => {
      this.eventsModel = calendar;
    });
  }
  getClients() {
    this.apiService.readContact().subscribe((contacts) => {
      const names = contacts.map(client => {
        return {nazwisko: client.nazwisko, id: client.id};
      });

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
