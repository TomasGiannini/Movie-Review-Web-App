import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Policy } from './policy.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Takedown } from './takedown.model';

@Injectable({providedIn: 'root'})
export class PolicyService {

private policy: Policy[] = [];
private policyUpdated = new Subject<Policy[]>();
private isPolicy = 0;

private takedown: Takedown[] = [];
private takedownUpdated = new Subject<Takedown[]>();
private isTakedown = 0;

constructor(private http: HttpClient, private router: Router) {}

getPolicies() {
  this.http.get<{message: string, policy: any}>(
    'http://localhost:3000/api/policy'
    )
    .pipe(map((policyData) => {
      return policyData.policy.map(policy => {
        return {
          id: policy._id,
          policy: policy.policy
        };
      });
    }))
  .subscribe((updatedPolicy) => {
    this.policy = updatedPolicy;
    this.policyUpdated.next([...this.policy]);
  });
}

getTakedowns() {
  this.http.get<{message: string, takedown: any}>(
    'http://localhost:3000/api/takedown'
    )
    .pipe(map((takedownData) => {
      return takedownData.takedown.map(takedown => {
        return {
          id: takedown._id,
          takedown: takedown.takedown
        };
      });
    }))
  .subscribe((updatedTakedown) => {
    this.takedown = updatedTakedown;
    this.takedownUpdated.next([...this.takedown]);
  });
}

getPolicyUpdateListener() {
  return this.policyUpdated.asObservable();
}

getTakedownUpdateListener() {
  return this.takedownUpdated.asObservable();
}

addPolicy(policy: string) {

  const apolicy: Policy = {
    policy: policy
  };
  this.http
  .post<{ message: string }>('http://localhost:3000/api/policy', apolicy)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });

  this.isPolicy = 1;
}

addTakedown(takedown: string) {

  const atakedown: Takedown = {
    takedown: takedown
  };
  this.http
  .post<{ message: string, takedown: string }>('http://localhost:3000/api/takedown', atakedown)
    .subscribe(responseData => {
      console.log('NO');
      this.router.navigate(['/']);
    });

  this.isTakedown = 1;
}

getIsPolicy() {
  return this.isPolicy;
}

getIsTakedown() {
  return this.isTakedown;
}

}
