function solution(m, musicinfos) {
    let musicList = [];

    const convertedM = convertMelody(m);

    musicinfos.forEach((info, idx) => {
        const [start, end, name, pitches] = info.split(",");
        const played = getPlayTime(start, end);

        const convertedMelody = convertMelody(pitches);

        const fullMelody = getFullMelody(played, convertedMelody);

        if (fullMelody.includes(convertedM)) {
            musicList.push({ name: name, len: played ,id: idx});
        }
    });

    if (!musicList.length) return "(None)";

    musicList.sort((a, b) => b.len - a.len || a.idx - b.idx);

    return musicList[0].name;
}

function getFullMelody(time, melody) {
    const melodyLen = melody.length;
    const fullRepeat = Math.floor(time / melodyLen);
    const remaining = time % melodyLen;

    return melody.repeat(fullRepeat) + melody.slice(0, remaining);
}

function getPlayTime(start, end) {
    return getMin(end) - getMin(start);
}

function getMin(time) {
    const [h, m] = time.split(":").map((t) => parseInt(t));
    return h * 60 + m;
}

function convertMelody(melody) {
    return melody.replaceAll(/C#/g, 'c')
                 .replaceAll(/D#/g, 'd')
                 .replaceAll(/F#/g, 'f')
                 .replaceAll(/G#/g, 'g')
                 .replaceAll(/A#/g, 'a')
                 .replaceAll(/B#/g, 'b');
}
