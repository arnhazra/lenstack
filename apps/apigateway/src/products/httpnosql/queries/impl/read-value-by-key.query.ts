export class ReadValueByKeyQuery {
	constructor(
		public readonly orgId: string,
		public readonly key: string
	) {}
}
