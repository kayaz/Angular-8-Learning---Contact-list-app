import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  newContact(form) {
    this.apiService.createContact(form.value).subscribe((contacts: Contact) => {
      this.router.navigate(['/contacts']);
    });
  }
}
