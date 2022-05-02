function getPGN(log: string[]) {
    let pgn = `[Event "?"]\n[Site "?"]\n[Date "????.??.??"]\n[Round "?"]\n[White "?"]\n[Black "?"]\n[Result "*"]\n[TimeControl "0"]\n\n`;
    for (let i = 0; i < log.length; i++) {
        if (i % 2 === 0) {
            pgn += (i / 2) + 1 + '. ';
        }
        pgn += log[i] + ' ';
    }
    return pgn;
}

export default getPGN;