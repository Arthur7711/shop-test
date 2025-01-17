export interface IProduct {
  id: number;
  imageUrl: string;
  name: string;
  url: string;
  autogeneratedSlug: string;
  description: string;
  price: number;
}

export interface IProducts {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: IProduct[];
}
