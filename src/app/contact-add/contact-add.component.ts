import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Contact } from '../_models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent {

  constructor(private apiService: ApiService, private router: Router) { }

  newContact(form) {
    this.apiService.createContact(form.value).subscribe((contacts: Contact) => {
      this.router.navigate(['/contacts']);
    });
  }
}
