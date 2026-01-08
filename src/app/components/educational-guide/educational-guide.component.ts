import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../services/education.service';
import { LanguageService, Translations } from '../../services/language.service';
import { EducationalContent, EducationCategory } from '../../models/business.model';

@Component({
    selector: 'app-educational-guide',
    templateUrl: './educational-guide.component.html',
    styleUrls: ['./educational-guide.component.scss'],
    standalone: false
})
export class EducationalGuideComponent implements OnInit {
  allContents: EducationalContent[] = [];
  filteredContents: EducationalContent[] = [];
  selectedContent: EducationalContent | null = null;
  selectedCategory: EducationCategory | 'all' = 'all';
  selectedDifficulty: 'all' | 'beginner' | 'intermediate' | 'advanced' = 'all';
  t: Translations;

  categories = [
    { value: 'all', label: 'Todos los Temas' },
    { value: EducationCategory.FIXED_COSTS, label: 'Costos Fijos' },
    { value: EducationCategory.VARIABLE_COSTS, label: 'Costos Variables' },
    { value: EducationCategory.PRICING, label: 'Fijación de Precios' },
    { value: EducationCategory.PROFIT_MARGIN, label: 'Margen de Ganancia' },
    { value: EducationCategory.BREAK_EVEN, label: 'Punto de Equilibrio' },
    { value: EducationCategory.CASH_FLOW, label: 'Flujo de Caja' }
  ];

  difficulties = [
    { value: 'all', label: 'Todos los Niveles' },
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' }
  ];

  constructor(
    private educationService: EducationService,
    private languageService: LanguageService
  ) {
    this.t = this.languageService.getTranslations();
  }

  ngOnInit(): void {
    this.languageService.language$.subscribe(() => {
      this.t = this.languageService.getTranslations();
    });
    this.allContents = this.educationService.getAllContent();
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allContents];

    // Filtrar por categoría
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === this.selectedCategory);
    }

    // Filtrar por dificultad
    if (this.selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === this.selectedDifficulty);
    }

    this.filteredContents = filtered;
  }

  selectContent(content: EducationalContent): void {
    this.selectedContent = content;
    // Scroll to top when selecting content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToList(): void {
    this.selectedContent = null;
  }

  getCategoryLabel(category: EducationCategory): string {
    return this.educationService.getCategoryLabel(category);
  }

  getDifficultyIcon(difficulty: string): string {
    const icons: { [key: string]: string } = {
      'beginner': '🌱',
      'intermediate': '🌿',
      'advanced': '🌳'
    };
    return icons[difficulty] || '';
  }

  getDifficultyLabel(difficulty: string): string {
    const labels: { [key: string]: string } = {
      'beginner': 'Principiante',
      'intermediate': 'Intermedio',
      'advanced': 'Avanzado'
    };
    return labels[difficulty] || '';
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  onDifficultyChange(event: any): void {
    this.selectedDifficulty = event.target.value;
    this.applyFilters();
  }
}
