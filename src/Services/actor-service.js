import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ActorService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getActorData(qty) {
    return this.httpClient.fetch(`http://192.168.50.4:5000/fumaki-api/actors/random/${qty}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data.actors;
      });
  }

}
