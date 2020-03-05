import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { OrganizationService } from '@app/http/organizations.service';
import { StorageService } from '@app/services/storage.service';
import { Organization } from '@shared/models/Organization';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { SearchOption } from '@shared/components/search/models/SearchOption';

@Component({
  templateUrl: './signin-as-dialog.component.html',
  styleUrls: ['./signin-as-dialog.component.scss']
})
export class SigninAsDialogComponent implements OnInit {

  currentAccounting: Organization;
  accountings: Organization[] = [];
  filters: SearchOption[] = [];
  accountingName: string;
  filtering = '';
  defaultRule = SearchRule.builder()
    .id('default')
    .value({ name: '' })
    .description('Nome contém: "{0}"')
    .build();

  constructor(
    public dialogRef: MatDialogRef<SigninAsDialogComponent>,
    public organizationService: OrganizationService,
    public userService: UserService,
    public storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.currentAccounting = User.fromLocalStorage().organization;
    this.accountingName = this.currentAccounting.name;
  }

  getContent(accounting: Organization) {
    return `${accounting.cnpj} - ${accounting.name}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filter() {
    const type = { type: Organization.Type.ACCOUNTING };

    const filter1 = Object.assign({ cnpj: this.filtering }, type);
    this.organizationService.
      fetch(filter1)
      .pipe(debounceTime(200))
      .subscribe(result1 => {

        const filter2 = Object.assign({ name: this.filtering }, type);
        this.organizationService
          .fetch(filter2)
          .subscribe(result2 => {

            this.accountings = result1.records.concat(result2.records);
            this.verifyAccounting();

          });

      });
  }

  verifyAccounting() {
    this.accountings.forEach(acc => {
      if (this.getContent(acc) === this.filtering) {
        this.currentAccounting = acc;
        this.accountingName = acc.name;
      }
    });
  }

  // hackings() {
  //   return [
  //     HackingRule.builder()
  //       .id('name')
  //       .value({ name: '' })
  //       .regex(/(nome)\:\s(?<value>.+)/ig)
  //       .description('Nome contém: "{0}"')
  //       .build(),
  //     HackingRule.builder()
  //       .id('cnpj')
  //       .value({ cnpj: '' })
  //       .regex(/(cnpj)\:\s(?<value>.+)/ig)
  //       .description('CNPJ igual a: {0}')
  //       .build()
  //   ];
  // }

  // apply(event: SearchOption) {
  //   const filters = this.filters.filter(fil => fil.id === event.id);
  //   if (filters.length > 0) {
  //     this.filters.splice(this.filters.indexOf(filters[0]), 1);
  //   }
  //   this.filters.push(event);
  //   this.fetch();
  // }

  // fetch() {
  //   const type = { type: Organization.Type.ACCOUNTING };
  // }

  confirm() {
    this.userService
      .patch(User.fromLocalStorage().id, { organization: this.currentAccounting })
      .subscribe(result => {
        const user = User.fromLocalStorage();
        user.organization = this.currentAccounting;
        this.storageService.store(AuthenticationService.STORAGE_KEY_USERINFO, JSON.stringify(user));
        this.dialogRef.close(this.currentAccounting);
      });
  }

}
