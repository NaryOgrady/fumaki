import 'fetch';
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { VoteEmitted } from './messages';

@inject(HttpClient, EventAggregator)
export class App {
  constructor(httpClient, ea) {
    this.httpClient = httpClient;
    ea.subscribe(VoteEmitted, msg => {
      alert(this.canSubmit());
      let flag = this.canSubmit();
      if (flag) {
        alert('submit');
      }
    });
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.httpClient.fetch('http://192.168.50.4:5000/fumaki-api/actors/random/3')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.actors = data.actors;
      });
  }

  canSubmit() {
    return this.actors.every(actor => {
      return actor.vote.length > 0;
    });
  }
}
