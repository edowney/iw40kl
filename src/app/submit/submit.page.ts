import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateValidator } from './customValidators/date.validator';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { StorageService, Item } from '../services/storage.service';
import { PlayersService } from '../services/formdata/players.service';
import { TracksService } from '../services/formdata/tracks.service';
import { FactionsService } from '../services/formdata/factions.service';

const DifferentPlayersValidator: ValidatorFn = (fg: FormGroup) => {
  const player1 = fg.get('yourname').value;
  const player2 = fg.get('opponentname').value;

  if (player2 === '') { return null; }
  if (player1 === player2) { return ({DifferentPlayersValidator: true}); }

  return null;
};

function NumberOrEmptyStringValidator(control: AbstractControl): { [key: string]: boolean }|null {
  if (control.value === '') {
    return null;
  } else if (isNaN(control.value)) {
    return { NumberOrEmptyString : true };
  }

  return null;
}

@Component({
  selector: 'submit-page',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
  providers: [PlayersService, TracksService, FactionsService]
})
export class SubmitPage implements OnInit {

  submitForm: FormGroup;

  players: unknown;
  tracks: unknown;
  factions: unknown;
  initialjudgings: Array<string>;
  modelbasings: Array<string>;
  paintingskills: Array<string>;
  conversions: Array<string>;
  displaybases: Array<string>;
  details: Array<string>;

  tournamentModeChangedValue: boolean;
  datePlayed: string;
  yourName: string;
  yourTrack: string;
  yourFaction: string;

  tournamentModeString = 'tournamentMode';
  tournamentOn = true;

  validations = {
    yourname: [
      { type: 'required', message: 'Your name is required.' }
    ],
    yourpoints: [
      { type: 'required', message: 'Your points is required.' },
      { type: 'pattern', message: 'Your points can only be numbers.' }
    ],
    yourfaction: [
      { type: 'required', message: 'Your faction is required.' }
    ],
    yourtrack: [
      { type: 'required', message: 'Your track is required.' }
    ],
    opponentname: [
      { type: 'required', message: 'Opponent name is required.' }
    ],
    opponentpoints: [
      { type: 'required', message: 'Opponent points is required.' },
      { type: 'pattern', message: 'Opponent points can only be numbers.' }
    ],
    opponentfaction: [
      { type: 'required', message: 'Opponent faction is required.' }
    ],
    opponenttrack: [
      { type: 'required', message: 'Opponent track is required.' }
    ],
    yourinitialjudging: [
      { type: 'required', message: 'Your initial judging is required.' }
    ],
    yourmodelbasing: [
      { type: 'required', message: 'Your model basing is required.' }
    ],
    yourpaintingskills: [
      { type: 'required', message: 'Your painting skill is required.' }
    ],
    yourconversions: [
      { type: 'required', message: 'Your conversions is required.' }
    ],
    yourextrasdisplaybases: [
      { type: 'required', message: 'Your display bases is required.' }
    ],
    yourextrasdetails: [
      { type: 'required', message: 'Your details is required.' }
    ]
  };

  constructor(private factionsService: FactionsService, private tracksService: TracksService, private playersService: PlayersService, public alertController: AlertController, private storage: Storage) { }

  getPlayers() {
    return this.playersService.get().then(playerList => {
      this.players = playerList;
    });
  }

  getTracks() {
    return this.tracksService.get().then(trackList => {
      this.tracks = trackList;
    });
  }

  getFactions() {
    return this.factionsService.get().then(factionList => {
      this.factions = factionList;
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async datePlayedChanged(event) {
    if (this.tournamentModeChangedValue) {
      console.log('datePlayed == ' + this.submitForm.controls.dateplayed.value);
      this.storage.set('datePlayed', this.submitForm.controls.dateplayed.value);
    }
  }

  async yourNameChanged(event) {
    if (this.tournamentModeChangedValue) {
      console.log('yourName == ' + this.submitForm.controls.yourname.value);
      this.storage.set('yourName', this.submitForm.controls.yourname.value);
    }
  }

  async yourTrackChanged(event) {
    if (this.tournamentModeChangedValue) {
      console.log('yourTrack == ' + this.submitForm.controls.yourtrack.value);
      this.storage.set('yourTrack', this.submitForm.controls.yourtrack.value);
    }
  }

  async yourFactionChanged(event) {
    if (this.tournamentModeChangedValue) {
      console.log('yourFaction == ' + this.submitForm.controls.yourfaction.value);
      this.storage.set('yourFaction', this.submitForm.controls.yourfaction.value);
    }
  }

  async populatePage() {
    this.datePlayed = await this.storage.get('datePlayed');
    this.yourName =  await this.storage.get('yourName');
    this.yourTrack =  await this.storage.get('yourTrack');
    this.yourFaction =  await this.storage.get('yourFaction');
    this.submitForm.controls.dateplayed.setValue(this.datePlayed);
    this.submitForm.controls.yourname.setValue(this.yourName);
    this.submitForm.controls.yourtrack.setValue(this.yourTrack);
    this.submitForm.controls.yourfaction.setValue(this.yourFaction);
  }

  async tournamentModeChanged(event) {
    this.storage.set(this.tournamentModeString, this.submitForm.controls[this.tournamentModeString].value);

    this.tournamentModeChangedValue = await this.storage.get(this.tournamentModeString);

    await this.presentAlert('Tournament Mode', this.tournamentModeChangedValue ? 'Tournament mode is ON.' : 'Tournament mode is OFF.');

    console.log('tournamentModeChangedValue == ' + this.tournamentModeChangedValue);

    if (this.tournamentModeChangedValue === this.tournamentOn) {
      this.populatePage();
    }
  }

  async getTournamentModeChanged() {
    this.tournamentModeChangedValue = await this.storage.get(this.tournamentModeString);
    console.log('getTournamentModeChanged.tournamentModeChangedValue == ' + this.tournamentModeChangedValue);
  }

  ngOnInit(): void {

    this.getPlayers();
    this.getTracks();
    this.getFactions();
    this.getTournamentModeChanged();

    if (this.tournamentModeChangedValue === this.tournamentOn) {
      console.log('Loading page data....');
      this.populatePage();
    } else {
      console.log('Not in tournament mode....');
    }

    this.initialjudgings = [ '0pts At least 1 model has primer for 1 of 3 colors',
                            '8pts Army fully painted with 3 colors',
                            '15pts Army fully painted with more than 3 colors' ];

    this.modelbasings = [ '0pts Bare bases no flock',
                          '2pts Basic one flock',
                          '4pts Multiple flocks or 1 flock with highlights',
                          '6pts Variety of flocks, highlights and additional elements' ];

    this.paintingskills = [ '0pts No advanced techniques',
                            '2pts Basic highlights and shading',
                            '4pts Incorporate layering with highlights and blending',
                            '6pts Shaded with seamless blending' ];

    this.conversions = [ '0pts No conversions of note',
                          '2pts Units or characters have multi kit conversions',
                          '4pts Army has difficult conversions with green stuff' ];

    this.displaybases = [ '0pts No center piece model',
                          '1pt Display base for center piece model with flock and paint.',
                          '2pts Diorama for center piece model'];

    this.details = [  '0pts No extras',
                      '1pts Rough free hand or transfers for squad or unit markings',
                      '2pts Quality Free hand or transfers for unit and squad markings or vehicle weathering'
                      ];

    this.submitForm = new FormGroup({
      tournamentMode: new FormControl(''),
      dateplayed: new FormControl('', Validators.compose([
        DateValidator.notFutureDate,
        Validators.required
      ])),
      yourpoints: new FormControl('', Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])),
      yourname: new FormControl('', Validators.required),
      yourfaction: new FormControl('', Validators.required),
      yourtrack: new FormControl('', Validators.required),
      opponentpoints: new FormControl('', Validators.compose([
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])),
      opponentname: new FormControl(''),
      opponentfaction: new FormControl(''),
      opponenttrack: new FormControl(''),
      yourhandicappoints: new FormControl('', Validators.compose([
        Validators.pattern('^[0-9]*$')
      ])),
      yourinitialjudging: new FormControl('', Validators.compose([
        Validators.required
      ])),
      yourmodelbasing: new FormControl('', Validators.compose([
        Validators.required
      ])),
      yourpaintingskills: new FormControl('', Validators.compose([
        Validators.required
      ])),
      yourconversions: new FormControl('', Validators.compose([
        Validators.required
      ])),
      yourextrasdisplaybases: new FormControl('', Validators.compose([
        Validators.required
      ])),
      yourextrasdetails: new FormControl('', Validators.compose([
        Validators.required
      ])),
      opponentsinitialjudging: new FormControl(''),
      opponentsmodelbasing: new FormControl(''),
      opponentspaintingskills: new FormControl(''),
      opponentsconversions: new FormControl(''),
      opponentsextrasdisplaybases: new FormControl(''),
      opponentsextrasdetails: new FormControl(''),
      opponentshandicappoints: new FormControl('', Validators.compose([
        NumberOrEmptyStringValidator
      ]))

    }, { validators: DifferentPlayersValidator });
  }

  onSubmit(values) {
    console.log(values);
    // this.submitForm.reset();

    this.presentAlert('Game Submitted', 'Your game data has been submitted.');
  }
}
