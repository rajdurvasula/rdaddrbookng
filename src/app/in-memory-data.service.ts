import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
	  const contacts = [
		  { id: 11, fname: 'Vinay', lname: 'Sharma', active: false },
		  { id: 12, fname: 'Akash', lname: 'Kumar', active: false }
	  ];
	  return {contacts};
  }

  genId(contacts: Contact[]): number {
	  return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 11;
  }
}
