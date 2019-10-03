import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Contact } from '../_models/contact';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contacts: Contact[];
  contactId: string;
  selectedContact: Contact = {id: null, imie: null, nazwisko: null, telefon: null, email: null};
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.contactId = this.route.snapshot.paramMap.get('id');
    this.apiService.editContact(Number(this.contactId)).subscribe((contacts: Contact[]) => {
      // @ts-ignore
      this.selectedContact = contacts;
    });

  }

  updateContact(form) {
    form.value.id = this.selectedContact.id;
    this.apiService.updateContact(form.value).subscribe((contacts: Contact) => {
      this.router.navigate(['/contacts']);
    });
  }

}
