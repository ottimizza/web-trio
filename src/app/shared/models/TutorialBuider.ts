import { GuidedTour, GuidedTourStep } from '@gobsio/ngx-guided-tour';

export class TutorialBuilder {

  private _id: string;
  private _steps: (GuidedTourStep & { mustShow: true | string })[] = [];
  private _validators: { [key: string]: boolean } = {};

  public id(id: string) {
    this._id = id;
    return this;
  }

  public step(step: GuidedTourStep) {
    const True: true = true;
    this._steps.push(Object.assign(step, { mustShow: True }));
    return this;
  }

  public optionalStep(validator: string, step: GuidedTourStep) {
    this._steps.push(Object.assign(step, { mustShow: validator }));
    return this;
  }

  public setData(validators: { [key: string]: boolean }) {
    this._validators = validators;
    return this;
  }

  public build(): GuidedTour {
    const steps = this._steps.filter(step => step.mustShow === true || this._validators[step.mustShow] === true)
    .map(step => {
      delete step.mustShow;
      return step;
    }) as GuidedTourStep[];
    return {
      tourId: this._id,
      steps
    };
  }

}
