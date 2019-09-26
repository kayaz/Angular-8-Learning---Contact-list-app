import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  config: any;
  constructor(private apiService: ApiService, private router: Router) {
    this.config = {
      itemsPerPage: 3,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.getList();
  }
  deleteContact(id) {
    this.apiService.deleteContact(id).subscribe((contacts: Contact) => {
      this.getList();
    });
  }
  getList() {
    this.apiService.readContact().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
}
