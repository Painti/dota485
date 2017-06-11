import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  pie: string;
  doughnut: string;

  creep_data1: any;
  creep_data2: any;
  neuteral_data1: any;
  neuteral_data2: any;
  ancient_data1: any;
  ancient_data2: any;
  tower_data1: any;
  tower_data2: any;

  creep_options1: Object;
  creep_options2: Object;
  neuteral_options1: Object;
  neuteral_options2: Object;
  ancient_options1: Object;
  ancient_options2: Object;
  tower_options1: Object;
  tower_options2: Object;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      let players_name: Array<string> = [];
      let creep_kills: Array<Number> = [];
      let neuteral_kills: Array<Number> = [];
      let ancient_kills: Array<Number> = [];
      let tower_kills: Array<Number> = [];

      let sumCreep = [0,0];
      let sumNeuteral = [0,0];
      let sumAncient = [0,0];
      let sumTower = [0,0];

      for (let i in match['players']) {

        match['players'][i]['creep_kills'] = 0;
        for (let key in match['players'][i].killed) {
          if (key.search('creep')) {
            match['players'][i]['creep_kills'] += match['players'][i].killed[key];
          }
        }

        players_name.push(match['players'][i]['name'] || match['players'][i]['personaname'] || '(anonymous)');
        creep_kills.push(match['players'][i]['creep_kills']);
        neuteral_kills.push(match['players'][i]['neutral_kills']);
        ancient_kills.push(match['players'][i]['ancient_kills']);
        tower_kills.push(match['players'][i]['tower_kills']);

        sumCreep[Math.floor(parseInt(i)/5)] += match['players'][i]['creep_kills'];
        sumNeuteral[Math.floor(parseInt(i)/5)] += match['players'][i]['neutral_kills'];
        sumAncient[Math.floor(parseInt(i)/5)] += match['players'][i]['ancient_kills'];
        sumTower[Math.floor(parseInt(i)/5)] += match['players'][i]['tower_kills'];
      }

      this.creep_data1['datasets'][0].data = sumCreep;
      this.creep_data2['datasets'][0].data = creep_kills;
      this.neuteral_data1['datasets'][0].data = sumNeuteral;
      this.neuteral_data2['datasets'][0].data = neuteral_kills;
      this.ancient_data1['datasets'][0].data = sumAncient;
      this.ancient_data2['datasets'][0].data = ancient_kills;
      this.tower_data1['datasets'][0].data = sumTower;
      this.tower_data2['datasets'][0].data = tower_kills;

      this.creep_data2.labels = players_name;
      this.neuteral_data2.labels = players_name;
      this.ancient_data2.labels = players_name;
      this.tower_data2.labels = players_name;
      this.match = match;
    });


    this.pie = 'pie';
    this.doughnut = 'doughnut';

    let color2 = ["#71d04a", "#c92626"];
    let color10 = [
      "#2e6ae6", "#5de6ad", "#ad00ad", "#dcd90a", "#e66200",
      "#e67ab0", "#92a440", "#5cc5e0", "#00771e", "#835603"
    ];
    let color10hover = [
      "#173471", "#40a179", "#560056", "#7e7c06", "#ef4236",
      "#cb6d9c", "#7c8b39", "#53aec6", "#005b17", "#412a00"
    ];
    let border2 = ["#151515", "#151515"];
    let border10 = [
      "#151515", "#151515", "#151515", "#151515", "#151515",
      "#151515", "#151515", "#151515", "#151515", "#151515"
    ];
    let borderWidth2 = [1, 1];
    let borderWidth10 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let data2 = {
      labels: ["Radiant", "Dire"],
      datasets: [
        {
          backgroundColor: color2,
          borderWidth: borderWidth2,
          borderColor: border2
        }
      ]
    };
    let data10 = {
      datasets: [
        {
          backgroundColor: color10,
          hoverBackgroundColor: color10hover,
          borderWidth: borderWidth10,
          borderColor: border10
        }
      ]
    };

    this.creep_data1 = JSON.parse(JSON.stringify(data2));
    this.creep_data2 = JSON.parse(JSON.stringify(data10));

    this.neuteral_data1 = JSON.parse(JSON.stringify(data2));
    this.neuteral_data2 = JSON.parse(JSON.stringify(data10));

    this.ancient_data1 = JSON.parse(JSON.stringify(data2));
    this.ancient_data2 = JSON.parse(JSON.stringify(data10));

    this.tower_data1 = JSON.parse(JSON.stringify(data2));
    this.tower_data2 = JSON.parse(JSON.stringify(data10));

    //define options
    let options = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        fontSize: 24,
        fontColor: "#afafaf",
        fontStyle: "normal"
      }
    };

    let clickNull = { onClick: null };

    this.creep_options1 = JSON.parse(JSON.stringify(options));
    this.creep_options2 = JSON.parse(JSON.stringify(options));
    this.creep_options1['title'].text = 'By Team';
    this.creep_options1['legend'] = clickNull;
    this.creep_options2['title'].text = 'By Player';

    this.neuteral_options1 = JSON.parse(JSON.stringify(options));
    this.neuteral_options2 = JSON.parse(JSON.stringify(options));
    this.neuteral_options1['title'].text = 'By Team';
    this.neuteral_options1['legend'] = clickNull;
    this.neuteral_options2['title'].text = 'By Player';

    this.ancient_options1 = JSON.parse(JSON.stringify(options));
    this.ancient_options2 = JSON.parse(JSON.stringify(options));
    this.ancient_options1['title'].text = 'By Team';
    this.ancient_options1['legend'] = clickNull;
    this.ancient_options2['title'].text = 'By Player';

    this.tower_options1 = JSON.parse(JSON.stringify(options));
    this.tower_options2 = JSON.parse(JSON.stringify(options));
    this.tower_options1['title'].text = 'By Team';
    this.tower_options1['legend'] = clickNull;
    this.tower_options2['title'].text = 'By Player';

  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

}
