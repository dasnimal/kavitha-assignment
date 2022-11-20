import { Injectable } from '@angular/core';
import { Employee } from '../shared/employee';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  employeesRef: AngularFireList<any>;
  employeeRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create employee
  AddEmployee(employee: Employee) {
    this.employeesRef.push({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      designation: employee.designation,
      salary:employee.salary,
    });
  }

  // Fetch Single Employee Object
  GetEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    return this.employeeRef;
  }

  // Fetch employees List
  GetEmployeesList() {
    this.employeesRef = this.db.list('employees-list');
    return this.employeesRef;
  }

  // Update employee Object
  UpdateEmployee(employee: Employee) {
    this.employeeRef.update({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      designation: employee.designation,
      salary:employee.salary,
    });
  }

  // Delete employee Object
  DeleteEmployee(id: string) {
    this.employeeRef = this.db.object('employees-list/' + id);
    this.employeeRef.remove();
  }
}
