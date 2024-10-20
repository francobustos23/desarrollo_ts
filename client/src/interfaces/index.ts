export interface Product {
    id: string; 
    name: string;
    categoryId: string;
    stock: number; 
  }
  
export interface DataItem {
    id: string; 
    name: string;
    stock: number;
    categoryId: string;
    state: boolean;
}

export interface DataCategory {
    id: string; 
    name: string;
}
  