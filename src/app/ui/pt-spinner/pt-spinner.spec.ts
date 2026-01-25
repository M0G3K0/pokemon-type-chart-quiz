import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './pt-spinner';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SpinnerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default size "md"', () => {
		expect(component.size).toBe('md');
	});

	it('should have default variant "primary"', () => {
		expect(component.variant).toBe('primary');
	});

	it('should have default aria-label', () => {
		expect(component.ariaLabel).toBe('Loading...');
	});

	it('should apply size class', () => {
		component.size = 'lg';
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('.pt-spinner');
		expect(element.classList.contains('pt-spinner--lg')).toBe(true);
	});

	it('should apply variant class', () => {
		component.variant = 'secondary';
		fixture.detectChanges();
		const element = fixture.nativeElement.querySelector('.pt-spinner');
		expect(element.classList.contains('pt-spinner--secondary')).toBe(true);
	});

	it('should have role="status"', () => {
		const element = fixture.nativeElement.querySelector('.pt-spinner');
		expect(element.getAttribute('role')).toBe('status');
	});
});
