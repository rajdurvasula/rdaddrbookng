import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	contacts: Contact[] = [];
	contact = new Contact(0,'','',false);
	submitted = false;

  constructor(
	  private router: Router,
	  private contactService: ContactService) { }

  ngOnInit(): void {
	  this.getContacts();
  }

  getContacts(): void {
	  this.contactService.getContacts()
	  .subscribe(contacts => this.contacts = contacts);
  }

  onSubmit(): void {
	  this.submitted = true;
  }

  clearContact(): void {
	  this.contact = new Contact(0,'','',false);
  }

  save(): void {
	  this.contactService.addContact(this.contact)
	  .subscribe(data => {
		  this.contacts.push(data);
	  });
	  this.clearContact();
	  this.router.navigate(['/dashboard']);
  }

}
