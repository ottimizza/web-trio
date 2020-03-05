import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { OrganizationService } from '@app/http/organizations.service';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './signin-as-dialog.component.html',
  styleUrls: ['./signin-as-dialog.component.scss']
})
export class SigninAsDialogComponent implements OnInit {

  currentAccounting: Organization;
  accountingsByCnpj: Organization[] = [];
  accountingsByName: Organization[] = [];
  filtering = { name: '', cnpj: '' };

  constructor(
    public dialogRef: MatDialogRef<SigninAsDialogComponent>,
    public organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    this.currentAccounting = User.fromLocalStorage().organization;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  filterByCnpj() {
    const search = { cnpj: this.filtering.cnpj };
    const cbFn = (res: GenericPageableResponse<Organization>) => {
      this.accountingsByCnpj = res.records;
    };
    this.nextPage(search, cbFn);
  }

  filterByName() {
    const search = { name: this.filtering.name };
    const cbFn = (res: GenericPageableResponse<Organization>) => {
      this.accountingsByName = res.records;
    };
    this.nextPage(search, cbFn);
  }

  nextPage(search: any, callbackFn: (res: GenericPageableResponse<Organization>) => void) {
    const filter = { type: Organization.Type.ACCOUNTING };
    const pageCriteria = { pageIndex: 0, pageSize: 20 };
    Object.assign(filter, pageCriteria, search);
    this.organizationService
      .fetch(filter)
      .pipe(debounceTime(300))
      .subscribe(result => callbackFn(result));
  }


}
