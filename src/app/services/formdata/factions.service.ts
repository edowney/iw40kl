import { Injectable } from '@angular/core';

const factions: string[] = ['Adepta Sororitas',
                            'Adeptus Custodes',
                            'Adeptus Mechanicus',
                            'Astra Millitarum',
                            'Black Templars',
                            'Blood Angels',
                            'Dark Angels',
                            'Deathwatch',
                            'Grey Knights',
                            'Imperial Fists',
                            'Imperial Knights',
                            'Inquisition',
                            'Iron Hands',
                            'Officio Assassinorum',
                            'Raven Guard',
                            'Salamanders',
                            'Sisters of Silence',
                            'Space Marines',
                            'Space Wolves',
                            'Ultramarines',
                            'White Scars',
                            'Chaos Daemons',
                            'Chaos Knights',
                            'Chaos Space Marines',
                            'Death Guard',
                            'Thousand Sons',
                            'Renegade Knights',
                            'Craftworlds',
                            'Drukhari',
                            'Genestealer Cults',
                            'Harlequins',
                            'Necrons',
                            'Orks',
                            'Tau Empire',
                            'Tyranids',
                            'Ynnari'
                          ].sort();

@Injectable({
  providedIn: 'root'
})
export class FactionsService {

  constructor() { }

  get() {
    return new Promise(resolve => resolve(factions));
  }
}
