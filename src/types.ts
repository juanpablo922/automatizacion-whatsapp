export interface Advisor {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'disponible' | 'ocupada' | 'pausa';
  activeChats: number;
  maxChats: number;
  responseTime: string;
}

export interface CatalogProduct {
  id: string;
  title: string;
  price: string;
  desc: string;
  img: string;
  tag: string;
  stock: string;
}

export interface StepInfo {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  tag: string;
}
