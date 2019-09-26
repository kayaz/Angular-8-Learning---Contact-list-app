import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { NgbPopover, NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  message: any;
  modaltitle: any;
  closeResult: string;
  modalOptions: NgbModalOptions;

  // @ts-ignore
  @ViewChild('popOver') public popover: NgbPopover;
  // @ts-ignore
  @ViewChild('mymodal') editModal: TemplateRef<any>;

  constructor(private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  handleDateClick(arg) {
    console.log(arg);
    this.message = arg.dateStr;
    this.popover.isOpen() ? this.popover.close() : this.popover.open();
  }
  handleEventClick(arg) {
    console.log(arg.el.text);
    this.modaltitle = arg.el.text;
    this.modalService.open(this.editModal, { centered: true });
  }
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${CalendarComponent.getDismissReason(reason)}`;
    });
  }
}
