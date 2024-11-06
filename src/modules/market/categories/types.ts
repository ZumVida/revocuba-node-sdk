export interface IMarketCategory {
  id: string;
  name: string;
  slug: string;
}

export interface IMarketCategoryTree extends IMarketCategory {
  children: IMarketCategory[];
}
