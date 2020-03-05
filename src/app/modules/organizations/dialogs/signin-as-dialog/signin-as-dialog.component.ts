import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { OrganizationService } from '@app/http/organizations.service';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '@app/http/users.service';

@Component({
  templateUrl: './signin-as-dialog.component.html',
  styleUrls: ['./signin-as-dialog.component.scss']
})
export class SigninAsDialogComponent implements OnInit {

  currentAccounting: Organization;
  accountings: Organization[] = [];
  filtering = '';
  accountingName: string;

  constructor(
    public dialogRef: MatDialogRef<SigninAsDialogComponent>,
    public organizationService: OrganizationService,
    public userService: UserService
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

  confirm() {
    this.userService
      .patch(User.fromLocalStorage().id, { organizationId: this.currentAccounting.id })
      .subscribe(result => console.log(result));
    this.dialogRef.close(this.currentAccounting);
  }

}
