export interface IValidationRule {
  description: string;

  regexp?: string;
}

export class PasswordValidator {

  constructor(
    public validationRules: Array<IValidationRule> = new Array<IValidationRule>()
  ) { }

  check(password: string): void {

  }

  addRule(validationRule: IValidationRule): PasswordValidator {
    return this;
  }

}
