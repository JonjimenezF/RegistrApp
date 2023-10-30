import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarasistenciaPage } from './iniciarasistencia.page';

describe('IniciarasistenciaPage', () => {
  let component: IniciarasistenciaPage;
  let fixture: ComponentFixture<IniciarasistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IniciarasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
