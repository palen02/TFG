import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatestsComponent } from './paginatests.component';

describe('PaginatestsComponent', () => {
  let component: PaginatestsComponent;
  let fixture: ComponentFixture<PaginatestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginatestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
