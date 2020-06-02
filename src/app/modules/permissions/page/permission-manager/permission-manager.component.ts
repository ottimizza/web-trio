import { Component, OnInit } from '@angular/core';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@app/services/toast.service';

@Component({
  templateUrl: './permission-manager.component.html',
  styleUrls: ['./permission-manager.component.scss']
})
export class PermissionManagerComponent implements OnInit {

  filters: SearchOption[] = [];

  records: any[] = [];

  pageInfo: PageInfo;
  pageIndex = 0;
  pageSize = 15;

  constructor(
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  removeFilter(filter: SearchOption) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.fetch();
  }

  filterApply(filter: SearchOption) {
    const filters = this.filters.map(so => so.id);
    const index = filters.indexOf(filter.id);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    this.filters.push(filter);
    this.fetch();
  }

  fetch() {
    this.records = [];
    this.pageInfo = null;
    this.nextPage();
  }

  nextPage() {
    const pageCriteria = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    const filter: any = {};
    this.filters.forEach(f => Object.assign(filter, f.value));
    Object.assign(filter, pageCriteria);
  }

}
