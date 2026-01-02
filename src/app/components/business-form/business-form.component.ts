import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseBusinessService } from '../../services/firebase-business.service';

@Component({
    selector: 'app-business-form',
    templateUrl: './business-form.component.html',
    styleUrls: ['./business-form.component.scss'],
    standalone: false
})
export class BusinessFormComponent {
  @Output() businessCreated = new EventEmitter<void>();
  
  businessForm: FormGroup;
  industries = [
    'Alimentos y Bebidas',
    'Retail y Comercio',
    'Servicios',
    'Manufactura',
    'Tecnología',
    'Salud y Belleza',
    'Educación',
    'Construcción',
    'Transporte',
    'Otro'
  ];

  constructor(
    private fb: FormBuilder,
    private businessService: FirebaseBusinessService
  ) {
    this.businessForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      industry: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.businessForm.valid) {
      this.businessService.addBusiness(this.businessForm.value);
      this.businessCreated.emit();
      this.businessForm.reset();
    }
  }
}
