import {Component, OnInit} from '@angular/core';
import {InvestmentService} from '../_services/investment.service';
import {Invest} from '../_models/invest';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  invests: Invest[];
  searchTerm: string;
  constructor(private investService: InvestmentService) { }

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.investService.readInvestment().subscribe((investments: Invest[]) => {
      this.invests = investments;
    });
  }
}
