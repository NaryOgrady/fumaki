import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { VoteEmitted } from './messages';


@inject(EventAggregator)
export class ActorDetail {
  @bindable actor;
  vote = '';

  constructor(ea) {
    this.ea = ea;
    ea.subscribe(VoteEmitted, msg => {
      if (msg.actor.id !== this.actor.id) {
        if (msg.vote === this.vote) {
          this.vote = '';
        }
      }
    });
  }

  handleVote(event) {
    this.vote = event.target.value;
    this.actor.vote = this.vote;
    this.ea.publish(new VoteEmitted(this.actor, this.vote));
  }
}
