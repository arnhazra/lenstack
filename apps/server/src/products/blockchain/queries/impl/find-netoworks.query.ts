export class FindNetworksQuery {
  constructor(
    public readonly searchQuery: string,
    public readonly selectedGatewayFilter: string,
    public readonly selectedNetworkFilter: string
  ) { }
}