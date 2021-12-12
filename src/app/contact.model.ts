export class Contact {
	id: number;
	fname: string;
	lname: string;
	active: boolean;
	constructor(
		id: number,
		fname: string,
		lname: string,
		active: boolean
	) {
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.active = active;
	}
}
