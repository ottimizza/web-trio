export enum ProductClassification {
  OTTIMIZZA,
  PARCEIROS
}

export class Product {

    static Group = class {
      static OTTIMIZZA = 'ottimizza';
      static TAREFFA = 'tareffa';
    };

    id: number;

    name: string;
    description: string;
    aboutUrl: string;

    appUrl: string;
    imageUrl: string;

    group: string;
    public classification: ProductClassification;


}

export class ProductAndAccess extends Product {
  public access: boolean;
}
