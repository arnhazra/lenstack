export class GetProductsQuery {
  constructor(
    public readonly searchQuery: string,
    public readonly selectedFilter: string
  ) { }
}