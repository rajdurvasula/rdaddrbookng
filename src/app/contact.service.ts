import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './contact.model';
import { MessageService } from './message.service';

const contactsUrl = "http://localhost:9080/api/contacts";

@Injectable({
  providedIn: 'root'
})

export class ContactService {
	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) { }

	getContacts(): Observable<Contact[]> {
		return this.http.get<Contact[]>(contactsUrl)
		.pipe(
			tap(_ => this.log('fetched contacts')),
				catchError(this.handleError<Contact[]>('getContacts', []))
		);
	}

	getContact(id: number): Observable<Contact> {
		const url = `${contactsUrl}/${id}`;
		return this.http.get<Contact>(url)
		.pipe(
			tap(_ => this.log(`fetched contact id=${id}`)),
				catchError(this.handleError<Contact>(`getContact id=${id}`))
		);
	}

	addContact(contact: Contact): Observable<Contact> {
		return this.http.post<Contact>(contactsUrl, contact, this.httpOptions)
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
