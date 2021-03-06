import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModal, NgbModalOptions, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../_services/api.service';

import { Calendar } from '../_models/calendar';
import { Contact } from '../_models/contact';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  constructor(
    // tslint:disable-next-line:max-line-length
    private apiService: ApiService, private modalService: NgbModal, private formBuilder: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  modalForm: FormGroup;
  submitted = false;
  isHidden: boolean;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  modaltitle: any;
  eventsModel: any;
  myDate;
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

    this.isHidden = true;
  }

  openModal() {
    this.modaltitle = 'Dodaj wydarzenie';
    this.modalForm.reset();
    this.modalService.open(this.editModal, { centered: true });
  }
  handleDateClick(arg) {
    this.modaltitle = 'Dodaj wydarzenie';
    this.modalForm.reset();
    this.isHidden = true;
    this.modalForm.setValue({
      typ: null,
      status: null,
      nazwa: null,
      data: arg.dateStr,
      id_inwest: null,
      opis: null,
      typeahead_user: null
    });
    this.modalService.open(this.editModal, { centered: true });
  }
  handleEventClick(arg) {
    this.isHidden = false;
    this.eventId = arg.event._def.publicId;
    this.apiService.editEvent(Number(this.eventId)).subscribe((calendar) => {
      // @ts-ignore
      this.selectedEvent = calendar;

      this.modalForm.setValue({
        typ: this.selectedEvent.typ,
        status: this.selectedEvent.status,
        nazwa: this.selectedEvent.nazwa,
        data: this.ngbDateParserFormatter.parse(this.selectedEvent.data),
        id_inwest: this.selectedEvent.id_inwest,
        opis: this.selectedEvent.opis,
        typeahead_user: {nazwisko: this.selectedEvent.nazwa_klient, id: this.selectedEvent.id_klient}
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

    form.value.data = this.ngbDateParserFormatter.format(form.value.data);
    this.apiService.createEvent(form.value).subscribe(() => {
      this.modalService.dismissAll();
      this.getEvents();
    });
  }
  editEvent(form, id) {
    this.submitted = true;
    if (this.modalForm.invalid) {
      return;
    }

    form.value.data = this.ngbDateParserFormatter.format(form.value.data);
    form.value.id = id;

    this.apiService.updateEvent(form.value).subscribe(() => {
      this.refreshModal();
    });
  }
  deleteEvent(id) {
    this.apiService.deleteEvent(id).subscribe(() => {
      this.refreshModal();
    });
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
  refreshModal() {
    this.isHidden = true;
    this.modalForm.reset();
    this.modalService.dismissAll();
    this.getEvents();
  }
}
