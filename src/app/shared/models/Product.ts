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


}

export class ProductAndAccess {
  public id: number;
  public name: string;
  public description: string;
  public aboutUrl: string;
  public appUrl: string;
  public imageUrl: string;
  public group: string;
  public access: boolean;
}
