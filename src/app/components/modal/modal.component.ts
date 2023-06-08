import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { StorageModel } from 'src/app/shared/models/storageModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusModel } from 'src/app/shared/models/statusModel';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public storage!: StorageModel;
  @Input() public statuses!: StatusModel[];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  formDetails!: FormGroup;
  isValidFormSubmitted!: boolean;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) { }

  // Access formcontrols getter
  get storageStatus() {
    return this.formDetails.get('storageStatus');
  }
  get storageId() {
    return this.formDetails.get('storageId');
  }

  changeStatus(e: any) {
    this.storageStatus?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  ngOnInit(): void { 
    this.setupForm();
    this.patchFormValues(this.storage);
  }

  setupForm() {
    this.formDetails = this.formBuilder.group({
      storageId: [{ value: this.storage?.storageId, disabled: true}, [Validators.required, Validators.maxLength(12)]],
      storageDate: '',		
      storageStatus: [''],
      storageAmount: ['']
    }); 
  }

  patchFormValues(details?: StorageModel) {
		this.formDetails.patchValue({
      storageId: details?.storageId,
			storageDate: this.formatDate(details?.storageDate),		
      storageStatus: details?.storageStatus,
      storageAmount: details?.storageAmount,
		});
	}

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
		if (this.formDetails.invalid) {
			return;
		}
		this.isValidFormSubmitted = true;
	
    this.storageId?.enable();
    this.passEntry.emit(this.formDetails.value);
    this.storageId?.disable();
    this.resetForm(this.formDetails);
    this.activeModal.close(this.formDetails.value);
  }

  resetForm(form: FormGroup) {
		form.reset();
	}

}
