import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageModel } from 'src/app/shared/models/storageModel';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { StorageService } from '../../shared/services/storage.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusModel } from 'src/app/shared/models/statusModel';


@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StorageComponent implements OnInit, OnDestroy {

  public storage!: StorageModel;
  public storages: StorageModel[] = [];
  formModal: any;
  modalConfig: any;

  public Statuses: StatusModel[] = [
    { key: 1, value: 'active' },
    { key: 2, value: 'completted' },
    { key: 3, value: 'cancelled' },
    { key: 4, value: 'blocked' }
  ];
  
  private subscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, 
              private confirmDialogService: ConfirmDialogService,
              public modalService: NgbModal,
              private service: StorageService,
              private changeDetectorRef: ChangeDetectorRef,
    ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const activatedRouteSubscription$ = this.activatedRoute.data.subscribe((data: any) => {
      if(!data || !data.storages) { return; }

      this.storages = [...data.storages];
    });
    this.subscription.add(activatedRouteSubscription$);
  }

  openModal(storage: any) {
    
    const modalRef = this.modalService.open(ModalComponent);
  
    if(storage == null) { 
      this.storage = {
        storageId: Math.round(this.storages.length + 1),
        storageDate: '',
        storageStatus: 0,
        storageAmount: 0
      };
      modalRef.componentInstance.storage = this.storage;
    } else {
      modalRef.componentInstance.storage = storage;
    }
    
    modalRef.componentInstance.statuses = this.Statuses;
    
    modalRef.componentInstance.passEntry.subscribe(
      (res: any) => { 

        this.storage = res; 
        let flag = false;
        Object.keys(this.storages).forEach((key: any) => {
          if(this.storages[key].storageId == this.storage.storageId) {
            this.storages[key] = {...this.storage};
            flag = true;
          }
        });
        if(!flag) {
          this.storages.push(this.storage);
        }
        this.changeDetectorRef.detectChanges();
      },
      (err: any) => console.error(err)
    );
  }

  public openConfirmationDialog(index: any) {
    this.confirmDialogService.confirm('Please confirm..', 'Are you sure you want to delete this id?')
    .then((confirmed: any) => {
      console.log('User confirmed:', confirmed);
      if(confirmed) {
        this.storages.splice(index, 1);
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //refresh page after delete or create
  refreshPage() {
    window.location.reload();
  }

}
