import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invest } from '../_models/invest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  PHP_API_SERVER = 'http://localhost/ngdb';
  constructor(private httpClient: HttpClient) {}

  readInvestment(): Observable<Invest[]> {
    return this.httpClient.get<Invest[]>(`${this.PHP_API_SERVER}/invest/read.php`);
  }

  editInvestment(id: number): Observable<Invest[]> {
    return this.httpClient.get<Invest[]>(`${this.PHP_API_SERVER}/invest/show.php/?id=${id}`);
  }

  createInvestment(investment: Invest): Observable<Invest> {
    return this.httpClient.post<Invest>(`${this.PHP_API_SERVER}/invest/create.php`, investment);
  }

  updateInvestment(investment: Invest) {
    return this.httpClient.put<Invest>(`${this.PHP_API_SERVER}/invest/update.php`, investment);
  }

  deleteInvestment(id: number) {
    return this.httpClient.delete<Invest>(`${this.PHP_API_SERVER}/invest/delete.php/?id=${id}`);
  }
}
