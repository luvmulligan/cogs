import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseBusinessService } from '../../services/firebase-business.service';
import { LanguageService, Translations } from '../../services/language.service';

@Component({
    selector: 'app-business-form',
    templateUrl: './business-form.component.html',
    styleUrls: ['./business-form.component.scss'],
    standalone: false
})
export class BusinessFormComponent implements OnInit {
  @Output() businessCreated = new EventEmitter<void>();
  
  t: Translations;
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
    private businessService: FirebaseBusinessService,
    private languageService: LanguageService
  ) {
    this.t = this.languageService.getTranslations();
    this.businessForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      industry: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(() => {
      this.t = this.languageService.getTranslations();
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
