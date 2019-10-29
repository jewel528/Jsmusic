global.bpm =  70;
global.pattern_size_shift = 3;
global.beats_per_pattern_shift = 1;
calculatePatternSize();
// global.looptimes = 100;


/*soloInstrument('kick');
soloInstrument('snare');
soloInstrument('hihat');
soloInstrument('piano1');
soloInstrument('piano2');
soloInstrument('piano3');
soloInstrument('piano4');
soloInstrument('piano5');*/
//muteInstrument('pad1');
// muteInstrument('pad2');
// muteInstrument('pad3');
//soloInstrument('sinelead');
// global.WASM_SYNTH_LOCATION = 'https://gist.githubusercontent.com/petersalomonsen/8ed949e2cfada00b82845828e415a8b8/raw/15404228b2c4bebf79f5f2a18dcecc50d0fb8721/synth.wasm';

var pianoVoices = [];
for(let n=1;n<=8;n++) {
  pianoVoices.push('piano'+n);
  addInstrument('piano'+n, {type: 'note'});
}
addInstrumentGroup('piano', pianoVoices);
addInstrument('kick', {type: 'number'});
addInstrument('snare', {type: 'number'});
addInstrument('hihat', {type: 'number'});
addInstrument('bass', {type: 'note'});
addInstrument('eftang', {type: 'note'});
var padVoices = [];
for(let n=1;n<=8;n++) {
  padVoices.push('pad'+n);
  addInstrument('pad'+n, {type: 'note'});
}
addInstrumentGroup('pads', padVoices);
addInstrument('sinelead', {type: 'note'});

var driveleadVoices = [];
for(let n=1;n<=4;n++) {
  driveleadVoices.push('drivelead'+n);
  addInstrument('drivelead'+n, {type: n === 4 ? 'number' : 'note'});
}
addInstrumentGroup('driveleads', driveleadVoices);


const primaryPatterns = {
   hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  	]),
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
  "piano": pp(4, [
    	[as4(3),d5(3),e3(3/8),g2(7/8),a4(23/8),f5(23/8)],,,,,,
        [,,d3(1/4),,],,,[,,f3(1/4),,],,[,,g3(1/4),,],
    	,,,[,,f3(1/4),,],,[,,d3,,],
        [,,f3(1/4),,],,,[,,g3(1/2),,],,,
        [b4(7/4),c5(15/8),g4(15/8),a2(1/2),e5(7/4)],,,,,,
        [,,,a2(1/4),],,,[,,,g3(1/4),],,a3,
        [d3(3/8),a3(1/4),c5(1),a4(1),ds5(1)],,[,c4(1/4),,,],d3(1/2),,[,d4(1/4),,,],
        fs4(1),,,
        ], 8),
	"bass": pp(4, [
      		g2(0.5),,,,,,
      		d3(1/4),,,f3(1/4),,g3(1/4),
            ,,,f3(1/4),,d3(1/4),
            f3(1/4),,,g3(1/2),,,
            a2(5/8),,,,,,
            e3(1/4),,,g3(1/4),,a3(1/4),
            d3(3/8),,,,,d4(3/8),
            ,,,a3,,c4
  	]), 

};

for(var n=0;n<2;n++) {
	playPatterns(primaryPatterns, 6);
}

// playFromHere();

for(var n=0;n<2;n++) {
  playPatterns(Object.assign({}, primaryPatterns, {
      "eftang": pp(4, [a5(6/8),,,,,,
            ,,,g5(1/4),,f5(1/4),
            ,,d5(1/4),,,,
    		,,,g5(1/4),,e5(6/8),,
            ,,,,,,,,d5(1/4),,c5(1/4),,
            ,,a4(3/8),,,,,]),
  }), 6);

  playPatterns(Object.assign({}, primaryPatterns, {
      "eftang": pp(4, [
        	f5(1/2),,,d5(1/4),,f5,
              ,,,g5(1/2),,,
              a5(1/2),,,g5(1/4),,f5(3/4),,
              ,,g5(1/2),,e5(2),,]),


  }), 6);
}


const basisPads =  pp(4, [[g3(6),as4(6),a4(6),d5(6),f5(6)],,,,,,
              ,,,,,,
              ,,,,,,
              ,,,,,,
              [,a3(3),c5(3),g4(3),e5(3)],,,,,,
              ,,,,,,
              [,ds5(3),fs4(3),c5(3),a4(3)],,,
        ], 8);


playPatterns(Object.assign({}, primaryPatterns, {
  "sinelead": pp(4, [d6(3/8),,,d6(1/4),,,
                    c6(1/4),,,a5(3/8),,d6(1/4),,
                    ,,,,,,,
    				a5,c6(3/8),,a5,
                    e6(3/8),,,e6(1/4),,,
                    d6(1/4),,,c6(1/4),,,
    				e6(1/4),,f6(1/4),e6,,c6,
                    ,,a5,c6,,a5]),
    "pads": basisPads

  }), 6);


playPatterns(Object.assign({}, primaryPatterns, {
  "sinelead": pp(4, [d6(3/8),,,d6(1/4),,,
                    c6(1/4),,,a5(3/8),,d6(1/4),,
                    ,,,,,,,
    				a5,c6(3/8),,a5,
                    e6(3/8),,,e6(1/4),,,
                    d6(1/4),,,c6(1/4),,,
    				f6(1/4),,e6(1/4),,d6,,c6,
                    ,a5,,g5]),
    "pads": basisPads,
    "driveleads": pp(4, [
      ,,,,,,
      ,,,,,,
      ,,,,,,
      ,,,,,,
      ,,,,,,
      ,,,,,,
      [c5(1/2),,g4(1/2)],,[d5(1/2),a4(1/2)],,
      [f5(1/2),,c5(1/2)],,[d5,g5],,
      [a5(1/2),f5(1/2)],,[a5,c6]], 3),


  }), 6);

// playFromHere();

for(var n=0;n<2;n++) {
playPatterns(Object.assign({}, primaryPatterns, {
    "pads": basisPads,
    "driveleads": pp(4, [
    	[d6(2),a5(2),f5(2)],,,,,,
      	,,,,[f6(4),c6(4),g5(4),63],,
        ,,,,,,
        ,,,,,,
        ,,,[d6(1/2),e5(1/2),a5(1/2)],
      	,,[c6(1/2),g5(1/2),d5(1/2)],,
      	,[d6(1/2),a5(1/2)],,[c6(1/2),g5(1/2)],
      	,,,[f5(1/2),a5(1/2)],
      	,,[g5(1/2),c6(1/2)],,[a5(1/2),d6(1/2)],             
    ], 4),


  }), 6);


playPatterns(Object.assign({}, primaryPatterns, {
    "pads": basisPads,
    "driveleads": pp(4, [
    	[a5(6),f5(6),c5(6),63],,,,,,
      	,,,,,,
      	,,,,,,
      	,,,,,,
      	g5(3),,,,,,
  		,,,,,,
  		f5(2),,g5,a5(2),,,
  		c6(2),,,d6(2),,,
    ], 4),

	
    }), 6);
}
// playFromHere();
for(var n=0;n<2;n++) {
playPatterns({
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
	hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  ]),
  "piano": pp(4, [
    [as5(5/4),d6(5/4),f5(5/4),],,,,
    ,,,,
    ,[as5(1/2),d6(1/2),f5],,,
    [f6(1),a5(3/4),c6(1)],,,,
    ,[c6(1/2),a5(1/2),f6(1/2)],,,
    ,[c6(1/2),a5(1/2),f6(1/2)],,,
    [gs5(3/4),f6(3/4),c6(3/4)],,,,
    ,,,,
    ,[gs5(1/2),f6(1/2),c6(1/2)],,,
    [c6(3/4),ds6(3/4),g5(1/2)],,,,
    ,[ds6(1/2),c6(1/2),g5(1/2)],,,
    ,[ds6(1/2),c6(1/2),g5(1/2)],,,
    [as5(3/4),d6(3/4),f5(3/4)],,,,
    ,,,,
    ,[as5(1/2),d6(1/2),f5(1/2)],,,
    [c6(3/4),a5(3/4),f6(3/4)],,,
    [c6(3/4),a5(3/4),f6(3/4)],,,,
    ,,[c6(1/2),a5,f6],,,
    [gs5(1/2),c6(3/4),f6],,,,
    ,,,,
    ,[gs5(1/2),f6(1/2),c6(1/2)],,,
    [c6(3/4),ds6(3/4),g5(3/4)],,,,
    ,[ds6(1/2),c6(1/2),g5(1/2)],,,
    ,[ds6,c6,g5]], 8),

 "driveleads": pp(4, [as5(1),,,f6(1/2),
    ,,c6(1),,
    ,as5(1),,c6(1),
    ,,c6,as5(1/2),
    ,c6,f6(1/2),,
    ,c6(1/2),,,
    as5(1/2),,,f6(1),
    ,,c6(1),,
    ,as5(1),,c6(1/2),
    ,c6(1/2),,as5(1/2),
    ,c6,f6(1/2),,
    ,[c6(1/2)],,], 4),

  
  "bass": pp(4, [as3(1),,,,,
    as3(1/2),,,
    ,as3(1/2),,,
    d3(3/4),,,,
    ,d3(1/2),,,
    ,d3,,e3(1/2),
    f3(1/2),,,,
    ,f3(1/2),,,
    ,f3,,,
    gs3(3/4),,,f3(1/2),
    ,gs3(3/4),,,,as3(1/2)
    ]),

   "pads": pp(4, [[d6(4),as5(4),f5(4)],,,,
      ,,,,
      ,,,,
      [a5(4),c6(4),],[,,f5(4)],,,
      ,,,,
      ,,,,
      [gs5(4),c6(4),ds5(4)],,
      ,,,,
      ,,,,,,
      [g5(3),ds5(3),as5(3)],,,,
      ,,,,
	], 8),

}, 6);

 // playFromHere();
playPatterns({
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
	hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  ]),
 "driveleads": pp(4, [as5(2)], 4),

  "bass": pp(4, [as3(1),,,,
    ,as3(1/2),,,
    ,as3(1/2),,,
    d3(3/4),,,,
    ,d3(1/2),,,
    ,d3,,e3(1/2),
    f3(1/2),,,,
    ,f3(1/2),,,
    ,f3,,,
    gs3(3/4),,,f3(1/2),
    ,gs3(3/4),,,,as3
    ,,f3]),

   "pads": pp(4, [[d6(4),as5(4),f5(4)],,,,
      ,,,,
      ,,,,
      [a5(4),c6(4),],[,,f5(4)],,,
      ,,,,
      ,,,,
      [gs5(4),c6(4),ds5(4)],,
      ,,,,
      ,,,,,,
      [g5(3),ds5(3),as5(3)],,,,
      ,,,,
	], 8),

}, 6);
}

// playFromHere();
const transitionpatterns = {
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
	hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  ]),
 
"driveleads": pp(4, [,,,f5(1/2),
    ,g5(1/2),,,
    as5(1/2),,,c6,
    d6(1),,,c6(1/2),
    ,as5(1/2),c6(3/4),,
    ,d6(1/2),,as5,
    ,,g5(1/2),,
    ,,,,
    ,f5(1/2),,g5(1/2),
    ,,as5(1/2),,
    ,c6(1/2),,,
    ,,,], 4),

"bass": pp(4, [c3(1),,,,
,,,,
,,,d3(1/2),
,,d3(9/4),,
,,,,
,,,,
ds3(5/2),,,,
,,,,
,,,f3(1/2),
,,f3,c4(3/4),
,,f4(1),,

]),


"pads": pp(4, [[as5(41/4),ds5(5/2),g5(11/4),d5(5/2),c3(11/4)],,,,
,,,,
,,,,
[,d3(3),c5(11/4),f5(3),],,,,
,,,,
,,,,
[,ds3(3),g5(3),ds5(3)],,,,
,,,,
,,,,
[,f5(3),f3(3),c5(3)],,,,
,,a5(1),,
,,,,
], 8),

};

playFromHere();
playPatterns(transitionpatterns, 6);

playPatterns(Object.assign({}, transitionpatterns, {
	"sinelead": pp(4, [,,,f5(1/2),
    ,g5(1/2),,,
    as5(1/2),,,c6,
    d6(1),,,c6(1/2),
    ,as5(1/2),c6(3/4),,
    ,d6(1/2),,as5,
    ,,g5(1/2),,
    ,,,,
    ,f5(1/2),,g5(1/2),
    ,,as5(1/2),,
    ,c6(1/2),,,
    ,,,]),
}), 6);

playPatterns(Object.assign({}, transitionpatterns, {
	"sinelead": pp(4, [,,,f5(1/2),
    ,g5(1/2),,,
    as5(1/2),,,c6,
    d6(1),,,c6(1/2),
    ,as5(1/2),c6(3/4),,
    ,d6(1/2),,as5,
    ,,g5(1/2),,
    ,,,,
    ,f5(1/2),,g5(1/2),
    ,,as5(1/2),,
    ,c6(1/2),,,as5
    ,,,]),
    "eftang": pp(4, [,,,f5(1/2),
    ,g5(1/2),,,
    as5(1/2),,,c6,
    d6(1),,,c6(1/2),
    ,as5(1/2),c6(3/4),,
    ,d6(1/2),,as5,
    ,,g5(1/2),,
    ,,,,
    ,f5(1/2),,g5(1/2),
    ,,as5(1/2),,
    ,c6(1/2),,,as5
    ,,,]),
}), 6);

playFromHere();
playPatterns({
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
	hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  ]),
 "driveleads": pp(4, [as5(2),f6(2)], 4),
	"sinelead": pp(4, [
    	as5,,,f6,,,as6,,,
      	as5,,as6,f6,,as6,,,
      	as5,,,f6,,,,
      	as5,,,f6,,,as6,,,
      	as5,,as6,f6,,as6,,,
      	as5,,,f6,,,
    ]),
  	"eftang": pp(4, [
    	as4,,,f5,,,as5,,,
      	as4,,as5,f5,,as5,,,
      	as4,,,f5,,,,
      	as4,,,f5,,,as5,,,
      	as4,,as5,f5,,as5,,,
      	as4,,,f5,,,
    ]),
  "bass": pp(4, [as3(1),,,,
    ,as3(1/2),,,
    ,as3(1/2),,,
    f3(3/4),,,,
    ,f3(1/2),,,
    ,f3,,f3(1/2),
    ds3(1/2),,,,
    ,ds3(1/2),,,
    ,ds3,,,
    f3(3/4),,,f3(1/2),
    ,f3(3/4),,,,f3
    ,,f3]),

   "pads": pp(4, [[d6(4),as5(4),f5(4)],,,,
      ,,,,
      ,,,,
      [a5(4),c6(4),],[,,f5(4)],,,
      ,,,,
      ,,,,
      [g5(4),as5(4),ds5(4)],,
      ,,,,
      ,,,,,,
      [a5(3),c6(3),f5(3)],,,,
      ,,,,
	], 8),
"piano": pp(4, [[as5(3/4),d6(3/4),f5(3/4),],,,,
,[as5(3/4),d6(3/4),f5(3/4),],,,
,[as5(3/4),f5(3/4),d6(3/4)],,,
[a5(1),c6(1),f5(1)],,,,
,[c6(3/4),a5(3/4),f5(3/4)],,,
,[a5(1/2),f5(1/2),c6(1/2)],,
,[as5(3/4),ds5(3/4),g5(3/4)],,,,
,[as5(3/4),ds5(3/4),g5(3/4)],,
,,[as5(3/4),ds5(3/4),g5(3/4)],,,
[a5(1),c6(1),f5(1)],,,,
,[a5(3/4),c6(3/4),f5(3/4)],,
,,[c6(1/2),f5(1/2),a5(1/2)],,,

  
  ], 8),

}, 6);
playFromHere();
playPatterns({
  snare: pp(4, [
    ,,,,,,60
    ,,,,,,
    ,,,,,,60
    ,,,,,20,
    ,,,,,,60
    ,,,,,,
    ,,,,,20,60
    ,,,20,,50
  ]),
	hihat: pp(4, [
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30,
    60,,30,60,,30
  ]),
  kick: pp(4, [
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
    60,,,,,,
  	,,,,,,
    ,,,60,,20,
  ]),
 "driveleads": pp(4, [,,,,
,,,,,,,,                      
f6(1),,,[,ds6(1/2)],
,d6(1/2),[,c6(3/4)],,
,as5(1),,,
[,c6(1)],,,d6(1/2),
,[,c6(1/2)],as5(1),,
,[,g5(3/4)],,,
f5(3/4),,,[,g5(3/4)],
,,as5(3/2),,
], 4),

  "piano": pp(4, [[as5(3/4),d6(3/4),f5(3/4),],,,,
,[as5(3/4),d6(3/4),f5(3/4),],,,
,[as5(3/4),f5(3/4),d6(3/4)],,,
[a5(1),c6(1),f5(1)],,,,
,[c6(3/4),a5(3/4),f5(3/4)],,,
,[a5(1/2),f5(1/2),c6(1/2)],,
,[as5(3/4),ds5(3/4),g5(3/4)],,,,
,[as5(3/4),ds5(3/4),g5(3/4)],,
,,[as5(3/4),ds5(3/4),g5(3/4)],,,
[a5(1),c5(1),f5(1)],,,,
,[a5(3/4),c5(3/4),f5(3/4)],,
,,[c5(1/2),f5(1/2),a5(1/2)],,,

  
  ], 8),
  "bass": pp(4, [as3(1),,,,
    ,as3(1/2),,,
    ,as3(1/2),,,
    f3(3/4),,,,
    ,f3(1/2),,,
    ,f3,,f3(1/2),
    ds3(1/2),,,,
    ,ds3(1/2),,,
    ,ds3,,,
    f3(3/4),,,f3(1/2),
    ,f3(3/4),,,,f3
    ,,f3]),

   "pads": pp(4, [[d6(4),as5(4),f5(4)],,,,
      ,,,,
      ,,,,
      [a5(4),c6(4),],[,,f5(4)],,,
      ,,,,
      ,,,,
      [g5(4),as5(4),ds5(4)],,
      ,,,,
      ,,,,,,
      [a5(3),c5(3),f5(3)],,,,
      ,,,,
	], 8),

}, 6);

playFromHere();
playPatterns(Object.assign({},primaryPatterns,{
	driveleads: pp(4, [
    	[a5(4),d5(4),,62]
      	,,,,,,
      	,,,,,,
      	,,,,,,
      	,,,,,,
      	,,
      	g5,a5(1/2),[,a5(3/4)],g5,
a5(1/2),,a5,,
as5(1/2),,a5(1),[,,ds6],
,g5(1/2),,d5(3/4),
,,,
  ,
    [f6,,,63]
    ],4)
}), 6);

playPatterns(Object.assign({},primaryPatterns,{
  "driveleads": pp(4, [
    ,,,,,,
    ,,,,,,
    ,,,,,,
    ,,,,,,
    
    ,,,,
,f6,[g6(2),fs6],,
,,,,
f6(1/2),,d6,,
c6(1/2),,,,
as5(1/2),,,], 4),

}), 6);

playFromHere();
playPatterns(Object.assign({},primaryPatterns,{
    "pads": basisPads,    
     "eftang": pp(4, [a5(6/8),,,,,,
              ,,,g5(1/4),,f5(1/4),
              ,,d5(1/4),,,,
              ,,,g5(1/4),,e5(6/8),,
              ,,,,,,,,d5(1/4),,c5(1/4),,
              ,,a4(3/8),,,,,]),
             
    "driveleads": pp(4, [a6(7/4),,,,
,,,,
,[,g6(1/2)],,f6(1/2),
,,d6(1/2),,
,,,,
,g6(1/2),,e6(5/2),
,,,,
,,
,e6,,,d6,c6(3/4),
,,a5(3/4),,
,,,,
,,,], 4),
         
}), 6);

playPatterns(Object.assign({},primaryPatterns,{
    "pads": basisPads,
      "eftang": pp(4, [
              f5(1/2),,,d5(1/4),,f5,
                ,,,g5(1/2),,,
                a5(1/2),,,g5(1/4),,f5(3/4),,
                ,,g5(1/2),,e5(2),,]),
}), 6);

playPatterns(Object.assign({},primaryPatterns,{
    "pads": basisPads,    
     "eftang": pp(4, [a5(6/8),,,,,,
              ,,,g5(1/4),,f5(1/4),
              ,,d5(1/4),,,,
              ,,,g5(1/4),,e5(6/8),,
              ,,,,,,,,d5(1/4),,c5(1/4),,
              ,,a4(3/8),,,,,]),
}), 6);

playPatterns(Object.assign({},primaryPatterns,{
    "pads": basisPads,
      "eftang": pp(4, [
              f5(1/2),,,d5(1/4),,f5,
                ,,,g5(1/2),,,
                a5(1/2),,,g5(1/4),,f5(3/4),,
                ,,g5(1/2),,e5(2),,]),
}), 6);
