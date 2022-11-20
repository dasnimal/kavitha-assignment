import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})

export class AddEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;

  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.crudApi.GetEmployeesList();
    this.empForm();
  }

  empForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      designation: [''],
      salary: [''],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get mobileNumber() {
    return this.employeeForm.get('mobileNumber');
  }
  get designation() {
    return this.employeeForm.get('designation');
  }
  get salary() {
    return this.employeeForm.get('salary');
  }
  ResetForm() {
    this.employeeForm.reset();
  }

  submitEmployeeData() {
    this.crudApi.AddEmployee(this.employeeForm.value);
    this.toastr.success(
      this.employeeForm.controls['firstName'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
