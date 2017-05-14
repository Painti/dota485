import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }

  public hostname:String = 'localhost';
  public port:Number = 3000;

}
