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
  contact = new Contact(0, '', '', false);

  submitted = false;

  constructor(
	  private router: Router,
	  private contactService: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
	  this.submitted = true;
  }

  clearContact(): void {
	  this.contact = new Contact(0,'','',false);
  }

  save(): void {
	  this.contactService.addContact(this.contact)
	  .subscribe(response => {
		  console.log(response);
	  });
	  this.clearContact();
	  this.router.navigate(['/dashboard']);
  }

}
