import 'fetch';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { ActorService} from '../Services/actor-service';

@inject(ActorService, EventAggregator)
export class Poller {
  constructor(actorService, ea) {
    this.actorService = actorService;
    this.ea = ea;
    this.actors = [];

    this.ea.subscribe('vote', msg => this.handleVote(msg, this.actors));
  }

  activate() {
    this.actorService.getActorData(3)
      .then(actors => {
        this.actors = actors;
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
