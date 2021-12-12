import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './contact.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
	private contactsUrl = '/api/contacts';
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	getContacts(): Observable<Contact[]> {
		return this.http.get<Contact[]>(this.contactsUrl)
		.pipe(
			tap(_ => this.log('fetched contacts')),
				catchError(this.handleError<Contact[]>('getContacts', []))
		);
	}

	getContact(id: number): Observable<Contact> {
		const url = `${this.contactsUrl}/${id}`;
		return this.http.get<Contact>(url)
		.pipe(
			tap(_ => this.log(`fetched contact id=${id}`)),
				catchError(this.handleError<Contact>(`getContact id=${id}`))
		);
	}

	addContact(contact: Contact): Observable<Contact> {
		return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions)
		.pipe(
			tap((newContact: Contact) => this.log(`added contact id=${contact.id}`)),
				catchError(this.handleError<Contact>('addContact'))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	private log(message: string) {
		this.messageService.add(`ContactService: ${message}`);
	}
}
