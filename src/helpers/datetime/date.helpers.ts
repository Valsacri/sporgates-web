export class DateHelper {
	static format(date: Date) {
		return date.toLocaleDateString('fr-FR');
	}

	static parse(date?: string) {
		if (!date) {
			return new Date();
		}

		const [day, month, year] = date.split('/');
		return new Date(Number(year), Number(month) - 1, Number(day));
	}
}
