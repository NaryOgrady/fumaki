import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(EventAggregator)
export class ActorCard {
  @bindable actor;

  constructor(ea) {
    this.ea = ea;
  }

  handleVote(vote) {
    let payload = {vote: vote, actor: this.actor};
    this.ea.publish('vote', payload);
  }

}
