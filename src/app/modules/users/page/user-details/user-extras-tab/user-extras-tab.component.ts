import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DataSelectOption } from '@shared/components/data-select/data-select.component';
import { brazilianDateValidator } from '@shared/validators/br-date.validator';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { olderDateValidator } from '@shared/validators/older-date.validator';

@Component({
  selector: 'app-user-extras-tab',
  templateUrl: './user-extras-tab.component.html',
  styleUrls: ['./user-extras-tab.component.scss']
})
export class UserExtrasTabComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public informations: { departments: string[], roles: string[] };

  public departmentList: DataSelectOption[] = [];
  public roleList: DataSelectOption[] = [];

  public form = new FormGroup({
    role:                 new FormControl(),
    accountingDepartment: new FormControl(),
    birthDate:            new FormControl('', olderDateValidator({ olderThan: new Date() }))
  });

  constructor(
    public service: UserService
  ) { }

  public get role() { return this.form.get('role'); }
  public get accountingDepartment() { return this.form.get('accountingDepartment'); }
  public get birthDate() { return this.form.get('birthDate'); }

  ngOnInit(): void {
    this.setUser();
    this.list();
  }

  public setUser() {
    this.user = this.user || User.fromLocalStorage();
  }

  public list() {
    this.departmentList = this.informations.departments.map(dep => {
      return {
        displayed: dep,
        value: dep
      };
    });
    this.roleList = this.informations.roles.map(role => {
      return {
        displayed: role,
        value: role
      };
    });
  }

  public update(event: any) {
    let ai = this.user.additionalInformation;
    if (ai) {
      Object.assign(ai, event);
    } else {
      ai = event;
    }
    this.user.additionalInformation = ai;
    this.service.patch(this.user.id, { additionalInformation: this.user.additionalInformation }).subscribe(result => {
      localStorage.setItem('user-info', JSON.stringify(result.record));
    });
  }

}
