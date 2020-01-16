
const synth = new Tone.Synth();
synth.oscillator.type = 'sine';
synth.toMaster();

const piano1stOctave = document.getElementById('piano1stOctave');
const piano2ndOctave = document.getElementById('piano2ndOctave');
const recButton = document.getElementById('rec');
const playButton = document.getElementById('play');
let recorded = [];
let recording = false;
let time = 0;

piano1stOctave.addEventListener('mousedown', e => {
    synth.triggerAttack(e.target.dataset.note);
    if (recording) {
        
        recorded.push({
            time: time,
            note: e.target.dataset.note,
            dur: '8n'
        });
        time++;
    }
});
piano2ndOctave.addEventListener('mousedown', e => {
    synth.triggerAttack(e.target.dataset.note);
});

piano1stOctave.addEventListener('mouseup', e => {
    synth.triggerRelease();
});
piano2ndOctave.addEventListener('mouseup', e => {
    synth.triggerRelease();
});

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'd':
            return synth.triggerAttack('C4');
        case 'r':
            return synth.triggerAttack('C#4');
        case 'f':
            return synth.triggerAttack('D4');
        case 't':
            return synth.triggerAttack('D#4');
        case 'g':
            return synth.triggerAttack('E4');
        case 'h':
            return synth.triggerAttack('F4');
        case 'u':
            return synth.triggerAttack('F#4');
        case 'j':
            return synth.triggerAttack('G4');
        case 'i':
            return synth.triggerAttack('G#4');
        case 'k':
            return synth.triggerAttack('A4');
        case 'o':
            return synth.triggerAtgtack('A#4');
        case 'l':
            return synth.triggerAttack('B4');
        default:
            return;
    }
});

document.addEventListener('keyup', e => {
    switch (e.key) {
        case 'd':
        case 'r':
        case 'f':
        case 't':
        case 'g':
        case 'h':
        case 'u':
        case 'j':
        case 'i':
        case 'k':
        case 'o':
        case 'l':
        synth.triggerRelease(); 
    }
});

function record() {
    recording = !recording;
    recButton.classList.toggle('rec-button-pressed');
    playButton.toggleAttribute('disabled')
}



function playRecord() {
    console.log(recorded)
    let part = new Tone.Part(function(time, event) {
        console.log(event)
        console.log(time)
        synth.triggerAttackRelease(event.note, event.dur, time)
    }, recorded);
    part.start(0);
    Tone.Transport.toggle();
}

