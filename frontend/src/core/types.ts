export type PhotoProductExtra = {
  border?: number;
  rotate?: number;
  texture?: string;
};

export type PhotoProduct = {
  id: string;
  orderCount: number;
  category: string;
  extra?: PhotoProductExtra
};

export type ProductResponse = PhotoProduct[];
