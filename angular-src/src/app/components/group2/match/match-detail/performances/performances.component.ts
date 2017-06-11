import { Component, OnInit } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  lh_data1: any;
  lh_data2: any;
  lh_data3: any;
  lh_options1: Object;
  lh_options2: Object;
  lh_options3: Object;

  gold_data1: any;
  gold_data2: any;
  gold_data3: any;
  gold_options1: Object;
  gold_options2: Object;
  gold_options3: Object;

  exp_data1: any;
  exp_data2: any;
  exp_data3: any;
  exp_options1: Object;
  exp_options2: Object;
  exp_options3: Object;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(match => {
      let label = [];
      if (match['players'][0].lh_t != null) {
        for (let i = 0; i < match['players'][0].lh_t.length; i++) {
          label.push(i + ":00");
        }
      }
      for(let i=0; i<10; i++){
        this.lh_data1.labels = label;
        this.lh_data2.labels = label;
        this.lh_data3.labels = label;
        this.lh_data1.datasets[i].data = match['players'][i].lh_t;
        let name = (match['players'][i].name || match['players'][i].personaname || "(anonymous)")+' ('+this.getHeroName(match['players'][i].hero_name)+')'
        this.lh_data1.datasets[i].label = name;
        if(i<5){
          this.lh_data2.datasets[i].data = match['players'][i].lh_t;
          this.lh_data2.datasets[i].label = name;
        } else {
          this.lh_data3.datasets[i-5].data = match['players'][i].lh_t;
          this.lh_data3.datasets[i-5].label = name;
        }

        this.gold_data1.labels = label;
        this.gold_data2.labels = label;
        this.gold_data3.labels = label;
        this.gold_data1.datasets[i].data = match['players'][i].gold_t;
        this.gold_data1.datasets[i].label = name;
        if(i<5){
          this.gold_data2.datasets[i].data = match['players'][i].gold_t;
          this.gold_data2.datasets[i].label = name;
        } else {
          this.gold_data3.datasets[i-5].data = match['players'][i].gold_t;
          this.gold_data3.datasets[i-5].label = name;
        }

        this.exp_data1.labels = label;
        this.exp_data2.labels = label;
        this.exp_data3.labels = label;
        this.exp_data1.datasets[i].data = match['players'][i].xp_t;
        this.exp_data1.datasets[i].label = name;
        if(i<5){
          this.exp_data2.datasets[i].data = match['players'][i].xp_t;
          this.exp_data2.datasets[i].label = name;
        } else {
          this.exp_data3.datasets[i-5].data = match['players'][i].xp_t;
          this.exp_data3.datasets[i-5].label = name;
        }
      }
      this.match = match;
    });

    let color = [
      "#2e6ae6", "#5de6ad", "#ad00ad", "#dcd90a", "#e66200",
      "#e67ab0", "#92a440", "#5cc5e0", "#00771e", "#835603"
    ];

    this.lh_data1 = {
      datasets: []
    };
    this.lh_data2 = {
      datasets: []
    };
    this.lh_data3 = {
      datasets: []
    };
    for(let i=0; i<10; i++){
      let data = {
        fill: false,
        backgroundColor: [color[i]],
        pointBackgroundColor: color[i],
        borderColor: color[i]
      };
      this.lh_data1['datasets'].push(data);
      if(i<5){
        this.lh_data2['datasets'].push(data);
      } else {
        this.lh_data3['datasets'].push(data);
      }
    }

    this.gold_data1 = {
      datasets: []
    };
    this.gold_data2 = {
      datasets: []
    };
    this.gold_data3 = {
      datasets: []
    };
    for(let i=0; i<10; i++){
      let data = {
        fill: false,
        backgroundColor: [color[i]],
        pointBackgroundColor: color[i],
        borderColor: color[i]
      };
      this.gold_data1['datasets'].push(data);
      if(i<5){
        this.gold_data2['datasets'].push(data);
      } else {
        this.gold_data3['datasets'].push(data);
      }
    }

    this.exp_data1 = {
      datasets: []
    };
    this.exp_data2 = {
      datasets: []
    };
    this.exp_data3 = {
      datasets: []
    };
    for(let i=0; i<10; i++){
      let data = {
        fill: false,
        backgroundColor: [color[i]],
        pointBackgroundColor: color[i],
        borderColor: color[i]
      };
      this.exp_data1['datasets'].push(data);
      if(i<5){
        this.exp_data2['datasets'].push(data);
      } else {
        this.exp_data3['datasets'].push(data);
      }
    }

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

    this.lh_options1 = JSON.parse(JSON.stringify(options));
    this.lh_options1['title'].text = "All Player"
    this.lh_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };

    this.lh_options2 = JSON.parse(JSON.stringify(options));
    this.lh_options2['title'].text = "Radiant Player"
    this.lh_options2['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
    this.lh_options3 = JSON.parse(JSON.stringify(options));
    this.lh_options3['title'].text = "Dire Player"
    this.lh_options3['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };

    this.gold_options1 = JSON.parse(JSON.stringify(options));
    this.gold_options1['title'].text = "All Player"
    this.gold_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Gold',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };

    this.gold_options2 = JSON.parse(JSON.stringify(options));
    this.gold_options2['title'].text = "Radiant Player"
    this.gold_options2['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Gold',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
    this.gold_options3 = JSON.parse(JSON.stringify(options));
    this.gold_options3['title'].text = "Dire Player"
    this.gold_options3['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Gold',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };

    this.exp_options1 = JSON.parse(JSON.stringify(options));
    this.exp_options1['title'].text = "All Player"
    this.exp_options1['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };

    this.exp_options2 = JSON.parse(JSON.stringify(options));
    this.exp_options2['title'].text = "Radiant Player"
    this.exp_options2['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
    this.exp_options3 = JSON.parse(JSON.stringify(options));
    this.exp_options3['title'].text = "Dire Player"
    this.exp_options3['scales'] = {
      yAxes: [
        {
          id: 'y-axis-exp',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Last Hits',
            fontColor: "#546372"
          }
        }
      ],
      xAxes: xAxis
    };
  }

  getHeroName(name){
    name = name.replace("_"," ");
    return name.charAt(0).toUpperCase()+name.slice(1);
  }

}
