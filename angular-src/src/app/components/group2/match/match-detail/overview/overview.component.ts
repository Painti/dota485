import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(
    private communicate: CommunicateService,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  match: Object;
  subscription: Subscription;
  obj_name:string;
  obj_status:string;

  pie: string;
  doughnut: string;
  line: string;

  gold_exp_data: any;
  kill_data1: any;
  kill_data2: any;
  gold_data1: any;
  gold_data2: any;
  gold_data3: any;
  exp_data1: any;
  exp_data2: any;
  exp_data3: any;

  gold_exp_options1: Object;
  kill_options1: Object;
  kill_options2: Object;
  gold_options1: Object;
  gold_options2: Object;
  gold_options3: Object;
  exp_options1: Object;
  exp_options2: Object;
  exp_options3: Object;

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      let players_name: Array<string> = [];
      let kills: Array<Number> = [];
      let gpm: Array<Number> = [];
      let exp: Array<Number> = [];
      for (let i in match['players']) {
        players_name.push(match['players'][i]['name'] || match['players'][i]['personaname'] || '(anonymous)');
        kills.push(match['players'][i]['kills']);
        gpm.push(match['players'][i]['gold_per_min']);
        exp.push(match['players'][i]['xp_per_min']);
      }

      this.kill_data1['datasets'][0].data = [match['radiant_score'], match['dire_score']];
      this.kill_data2['datasets'][0].data = kills;
      this.gold_data1['datasets'][0].data = match['radiant_gold_adv'];
      let gold_label = [];
      if (match['radiant_gold_adv'] != null) {
        for (let i = 0; i < match['radiant_gold_adv'].length; i++) {
          gold_label.push(i + ":00");
        }
      }
      this.gold_data1.labels = gold_label;
      this.gold_data2['datasets'][0].data = match['team_gpm'];
      this.gold_data3['datasets'][0].data = gpm;

      this.exp_data1['datasets'][0].data = match['radiant_xp_adv'];
      let exp_label = [];
      if (match['radiant_xp_adv'] != null) {
        for (let i = 0; i < match['radiant_xp_adv'].length; i++) {
          exp_label.push(i + ":00");
        }
      }
      this.exp_data1.labels = exp_label;
      this.exp_data2['datasets'][0].data = match['team_exp'];
      this.exp_data3['datasets'][0].data = exp;

      this.gold_exp_data.labels = gold_label || exp_label;
      this.gold_exp_data['datasets'][0].data = match['radiant_gold_adv'];
      this.gold_exp_data['datasets'][1].data = match['radiant_xp_adv'];

      this.kill_data2.labels = players_name;
      this.gold_data3.labels = players_name;
      this.exp_data3.labels = players_name;
      this.match = match;
      this.slimLoadingBarService.complete();
    });

    // Create Chart
    this.pie = 'pie';
    this.doughnut = 'doughnut';
    this.line = 'line';

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

    //define data
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
    let data3 = {
      datasets: [
        {
          backgroundColor: color10,
          hoverBackgroundColor: color10hover,
          borderWidth: borderWidth10,
          borderColor: border10
        }
      ]
    };

    this.gold_exp_data = {
      datasets: [
        {
          label: "Gold Diff.",
          backgroundColor: ["rgba(242, 255, 0, 0.1)"],
          pointBackgroundColor: "#f2ff00",
          borderWidth: borderWidth2,
          borderColor: ["#f2ff00"]
        },
        {
          label: "Exp Diff.",
          backgroundColor: ["rgba(0, 255, 255, 0.1)"],
          pointBackgroundColor: "#00ffff",
          borderWidth: borderWidth2,
          borderColor: ["#00ffff"]
        }
      ]
    };

    this.kill_data1 = JSON.parse(JSON.stringify(data2));
    this.kill_data2 = JSON.parse(JSON.stringify(data3));
    this.gold_data1 = {
      datasets: [
        {
          label: "Gold Diff.",
          backgroundColor: ["rgba(242, 255, 0, 0.1)"],
          pointBackgroundColor: "#f2ff00",
          borderWidth: borderWidth2,
          borderColor: ["#f2ff00"]
        }
      ]
    };
    this.gold_data2 = JSON.parse(JSON.stringify(data2));
    this.gold_data3 = JSON.parse(JSON.stringify(data3));

    this.exp_data1 = {
      datasets: [
        {
          label: "Exp Diff.",
          backgroundColor: ["rgba(0, 255, 255, 0.1)"],
          pointBackgroundColor: "#00ffff",
          borderWidth: borderWidth2,
          borderColor: ["#00ffff"]
        }
      ]
    };
    this.exp_data2 = JSON.parse(JSON.stringify(data2));
    this.exp_data3 = JSON.parse(JSON.stringify(data3));

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
    let xAxis = [
      {
        id: 'x-axis',
        display: true,
        ticks: {
          callback: function(label, index, labels) {
            if (index % 5 != 0)
              return "";
            return label;
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Time(minutes)',
          fontColor: "#546372"
        }
      }
    ];

    this.kill_options1 = JSON.parse(JSON.stringify(options));
    this.kill_options2 = JSON.parse(JSON.stringify(options));
    this.gold_options1 = JSON.parse(JSON.stringify(options));
    this.gold_options2 = JSON.parse(JSON.stringify(options));
    this.gold_options3 = JSON.parse(JSON.stringify(options));
    this.exp_options1 = JSON.parse(JSON.stringify(options));
    this.exp_options2 = JSON.parse(JSON.stringify(options));
    this.exp_options3 = JSON.parse(JSON.stringify(options));
    this.gold_exp_options1 = JSON.parse(JSON.stringify(options));

    this.kill_options1['title'].text = 'Player Kill Score';
    this.kill_options1['legend'] = clickNull;
    this.kill_options2['title'].text = 'Team Kill Score';

    this.gold_options1['title'].text = 'Radiant GPM Advantage';
    this.gold_options1['legend'] = clickNull;
    this.gold_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-gold',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Gold Difference',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
    this.gold_options2['title'].text = 'Total GPM Per Team';
    this.gold_options2['legend'] = clickNull;
    this.gold_options3['title'].text = 'GPM Per Player';

    this.exp_options1['title'].text = 'Radiant XPM Advantage';
    this.exp_options1['legend'] = clickNull;
    this.exp_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Exp Difference',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
    this.exp_options2['title'].text = 'Total XPM Per Team';
    this.exp_options2['legend'] = clickNull;
    this.exp_options3['title'].text = 'XPM Per Player';

    this.gold_exp_options1['title'].text = 'Radiant Adventage';
    this.gold_exp_options1['legend'] = clickNull;
    this.gold_exp_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Exp Difference',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
  }

  getMainOpacity(bool){
    if(bool)
      return '1.0';
    return '0.3';
  }

  getOpacity(dec, num){
    let bin = (dec >>> 0).toString(2);
    bin = bin.split("").reverse().join("");
    if(num > bin.length){
      return '0.3';
    }
    if(bin[num-1] == '0'){
      return '0.3';
    }
    return '1.0';
  }

  setObject(name, status){
    this.obj_name = name;
    if(status == '0.3'){
      this.obj_status = 'Destroyed';
    } else {
      this.obj_status = 'Not destroyed';
    }
  }

}
