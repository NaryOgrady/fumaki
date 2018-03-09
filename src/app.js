
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Fumaki';
    config.map([
      { route: '', name: 'poll', moduleId: 'Poller/poller', title: 'Vote' }
    ]);
  }
}
