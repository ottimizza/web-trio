import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AvatarDialogComponent } from '@modules/organizations/dialogs/avatar-dialog/avatar-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FileStorageService } from '@app/http/file-storage.service';
import { ImageCompressorService } from '@app/services/image-compression.service';
import { ImageUtils } from '@shared/utils/image.utils';
import { ImageCompressionService } from '@app/http/image-compression.service';


interface BreadCrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetaisComponent implements OnInit {

  public currentUser: User;

  public organization: Organization = new Organization();

  public editingId: string;

  public breadcrumb: BreadCrumb;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public fileStorageService: FileStorageService,
    public imageCompressionService: ImageCompressionService,
    public organizationService: OrganizationService,
    public dialog: MatDialog) {
  }

  public edit = (id: string = null) => this.editingId = id;
  public isEditing = (id: string) => this.editingId === id;

  public fetchById(id: number) {
    this.organizationService.fetchById(id).pipe(
      finalize(() => {
        this.breadcrumb = {
          label: `${this.organization.name}`,
          params: {},
          url: this.router.url
        };
        this.edit();
      })
    ).subscribe((response: GenericResponse<Organization>) => {
      this.organization = response.record;
    });
  }

  public patch(id: number, data: any): void {
    this.organizationService.patch(id, data).pipe(
      finalize(() => {
        this.breadcrumb = {
          label: `${this.organization.name}`,
          params: {},
          url: this.router.url
        };
        this.edit();
      })
    ).subscribe((response: GenericResponse<Organization>) => {
      this.organization = response.record;
    });
  }

  canEditOrganization = () => [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);


  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      maxWidth: '568px',
      data: { name: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.croppedImage) {
        this.imageCompressionService.compress(ImageUtils.dataURLtoFile(result.croppedImage, result.croppedName))
          .subscribe((compressed) => {
            this.fileStorageService.store(ImageUtils.blobToFile(compressed, result.croppedName))
              .pipe(finalize(() => document.location.reload()))
              .subscribe((response) => {
                if (response.record && response.record.id) {
                  this.patch(this.organization.id, {
                    avatar: this.fileStorageService.getResourceURL(response.record.id)
                  });
                }
              });
          });
      }
    });
  }


  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.activatedRoute.params.subscribe((params: any) => {
      this.fetchById(params.id);
    });
  }

}
