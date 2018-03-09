import 'fetch';
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(HttpClient, EventAggregator)
export class Poller {
  constructor(httpClient, ea) {
    this.httpClient = httpClient;
    this.ea = ea;
    this.actors = [];

    this.ea.subscribe('vote', msg => this.handleVote(msg, this.actors));
  }

  activate() {
    this.httpClient.fetch('http://192.168.50.4:5000/fumaki-api/actors/random/3')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.actors = this.processActorData(data.actors);
      });
  }

  handleVote(msg, actors) {
    for (let i = 0; i < actors.length; i++) {
      let actor = actors[i];
      if (actor === msg.actor) {
        actor.vote = msg.vote;
      } else if (actor.vote === msg.vote) {
        actor.vote = '';
      }
    }
  }

  processActorData(actors) {
    for (let i = 0; i < actors.length; i++) {
      let actor = actors[i];

      actor.desc = 'Lorem ipsum dolo sit';
      actor.vote = '';
    }
    return actors;
  }
}
