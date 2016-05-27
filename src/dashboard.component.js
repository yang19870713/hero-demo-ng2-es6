import {Component} from 'angular2/core';
import HeroService from './hero.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-dashboard',
    template:`
        <h3>Top Heroes</h3>
        <div class="grid grid-pad">
            <div *ngFor="let hero of heroes"
                (click)="gotoDetail(hero)"
                class="col-1-4">
                <div class="hero module">
                    <h4>{{hero.name}}</h4>
                </div>
            </div>
        </div>
    `,
    styles: [require('stylesheets/dashboard.component.scss').toString()]
})
export default class DashboardComponent {
    constructor(heroService, router){
        this.heroService = heroService;
        this.router = router;
    }
    gotoDetail(hero){
        let link = '/detail/:' + hero.id;
        this.router.navigateByUrl(link);
    }
    ngOnInit(){
        this.heroService.getHeroes()
            .then(heroes => this.heroes=heroes.slice(1,5));
    }
    static get parameters(){
        return [[HeroService], [Router]];
    }
}
